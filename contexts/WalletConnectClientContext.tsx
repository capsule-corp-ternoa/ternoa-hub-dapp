import {
  createContext,
  useCallback,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Client from "@walletconnect/sign-client";
import QRCodeModal from "@walletconnect/legacy-modal";
import { isMobile as checkIsMobile } from "@walletconnect/legacy-utils";
import { ERROR } from "@walletconnect/utils";
import { IContext } from "./types";
import { PairingTypes, SessionTypes } from "@walletconnect/types";

const DEFAULT_APP_METADATA = {
  name: "SufinTiimy collection",
  description: "SufinTiimy collection",
  url: "https://ternoa.com",
  icons: ["https://www.ternoa.com/favicon.ico"],
};

const TERNOA_CHAIN = "ternoa:6859c81ca95ef624c9dfe4dc6e3381c3";

const PROJECT_ID = "31eb5f43f429f30946cda1c9396997fd";

export const WalletConnectClientContext = createContext<IContext>(
  {} as IContext
);

export const WalletConnectClientContextProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [client, setClient] = useState<Client>();
  const [pairings, setPairings] = useState<PairingTypes.Struct[]>([]);
  const [session, setSession] = useState<SessionTypes.Struct>();
  const [isInitializing, setIsInitializing] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [account, setAccount] = useState<string>();
  const isMobile = checkIsMobile();

  const isConnected = !!session;

  const reset = () => {
    setPairings([]);
    setSession(undefined);
    setAccount(undefined);
  };

  const onSessionConnected = useCallback((_session: SessionTypes.Struct) => {
    const account = Object.values(_session.namespaces)
      .map((namespace) => namespace.accounts)
      .flat()[0]
      .split(":")[2];
    setSession(_session);
    setAccount(account);
    console.log("connected", _session, account);
  }, []);

  const connect = useCallback(
    async (pairing: any) => {
      if (typeof client === "undefined") {
        throw new Error("WalletConnect is not initialized");
      }
      try {
        setIsConnecting(true);
        const requiredNamespaces = {
          ternoa: {
            chains: [TERNOA_CHAIN],
            events: ["polkadot_event_test"],
            methods: ["sign_message"],
          },
        };
        const { uri, approval } = await client.connect({
          pairingTopic: pairing?.topic,
          requiredNamespaces: requiredNamespaces,
        });
        if (uri) {
          if (!isMobile) {
            QRCodeModal.open(uri, () => {
              setIsConnecting(false);
            });
          } else {
            window.location.replace(`ternoa-wallet://wc?uri=${uri}`);
          }
        }
        const session = await approval();
        console.log("Established session:", session);
        onSessionConnected(session);
      } catch (e) {
        console.error(e);
        // ignore rejection
      } finally {
        setIsConnecting(false);
        if (!isMobile) {
          QRCodeModal.close();
        }
      }
    },
    [client, onSessionConnected, isMobile]
  );

  const disconnect = useCallback(async () => {
    console.log("disconnect", session);
    if (typeof client === "undefined") {
      throw new Error("WalletConnect is not initialized");
    }
    if (typeof session === "undefined") {
      throw new Error("Session is not connected");
    }
    await client.disconnect({
      topic: session.topic,
      reason: ERROR.USER_DISCONNECTED.format(),
    });
    // Reset app state after disconnect.
    reset();
  }, [client, session]);

  const subscribeToEvents = useCallback(
    async (_client: Client) => {
      if (typeof _client === "undefined") {
        throw new Error("WalletConnect is not initialized");
      }
      _client.on("session_update", ({ topic, params }) => {
        console.log("EVENT", "session_update", { topic, params });
        const { namespaces } = params;
        const _session = _client.session.get(topic);
        const updatedSession = { ..._session, namespaces };
        onSessionConnected(updatedSession);
      });
      _client.on("session_delete", () => {
        console.log("EVENT", "session_delete");
        reset();
      });
    },
    [onSessionConnected]
  );

  const checkPersistedState = useCallback(
    async (_client: Client) => {
      if (typeof _client === "undefined") {
        throw new Error("WalletConnect is not initialized");
      }
      // populates existing pairings to state
      setPairings(_client.pairing.values);
      console.log("RESTORED PAIRINGS: ", _client.pairing.values);
      if (typeof session !== "undefined") return;
      // populates (the last) existing session to state
      if (_client.session.length) {
        const lastKeyIndex = _client.session.keys.length - 1;
        const _session = _client.session.get(
          _client.session.keys[lastKeyIndex]
        );
        console.log("RESTORED SESSION:", _session);
        await onSessionConnected(_session);
        return _session;
      }
    },
    [session, onSessionConnected]
  );

  const createClient = useCallback(async () => {
    try {
      setIsInitializing(true);
      const _client = await Client.init({
        logger: "debug",
        relayUrl: "wss://wallet-connectrelay.ternoa.network/",
        projectId: PROJECT_ID,
        metadata: DEFAULT_APP_METADATA,
      });
      console.log("CREATED CLIENT: ", _client);
      await subscribeToEvents(_client);
      await checkPersistedState(_client);
      setClient(_client);
    } catch (err) {
      throw err;
    } finally {
      setIsInitializing(false);
    }
  }, [checkPersistedState, subscribeToEvents]);

  useEffect(() => {
    if (!client) {
      createClient();
    }
  }, [client, createClient]);

  return (
    <WalletConnectClientContext.Provider
      value={{
        pairings,
        isInitializing,
        isConnecting,
        isConnected,
        account,
        client,
        session,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletConnectClientContext.Provider>
  );
};