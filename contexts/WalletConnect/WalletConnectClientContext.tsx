import {
  createContext,
  useCallback,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import Client from "@walletconnect/sign-client";
import { isMobile as checkIsMobile } from "@walletconnect/legacy-utils";
import { ERROR } from "@walletconnect/utils";
import { IContext } from "./types";
import { PairingTypes, SessionTypes } from "@walletconnect/types";
import WalletConnectModal from "../../components/organisms/modals/WalletConnectModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  LoadingState,
  TxType,
  WalletConnectRejectedRequest,
} from "../../types";
import WalletConnectRequestModals from "./components/WalletConnectRequestModals";

const DEFAULT_APP_METADATA = {
  name: "Ternoa HUB",
  description: "Ternoa HUB dApp",
  url: "https://hub.ternoa.network/",
  icons: ["https://www.ternoa.com/favicon.ico"],
};

export const WalletConnectClientContext = createContext<IContext>(
  {} as IContext
);

export const WalletConnectClientContextProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const initialized = useRef<boolean>();
  const [client, setClient] = useState<Client>();
  const [pairings, setPairings] = useState<PairingTypes.Struct[]>([]);
  const [session, setSession] = useState<SessionTypes.Struct>();
  const [isInitializing, setIsInitializing] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isDisconnecting, setIsDisconnecting] = useState<boolean>(false);
  const [isCreatingUri, setIsCreatingUri] = useState<boolean>(false);
  const [account, setAccount] = useState<string>();
  const [walletConnectModalUri, setWalletConnectModalUri] =
    useState<string | undefined>(undefined);
  const [requestTxType, setRequestTxType] = useState<TxType>();
  const [requestHash, setRequestHash] = useState<string>();
  const [requestLoadingState, setRequestLoadingState] =
    useState<LoadingState>("idle");
  const [requestError, setRequestError] = useState<Error>();
  const isMobile = checkIsMobile();
  const currentNetwork = useSelector(
    (state: RootState) => state.blockchain.currentNetwork
  );

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
        setIsCreatingUri(true);
        const requiredNamespaces = {
          ternoa: {
            chains: [currentNetwork.ternoaChain],
            events: ["polkadot_event_test"],
            methods: ["sign_message"],
          },
        };
        const { uri, approval } = await client.connect({
          pairingTopic: pairing?.topic,
          requiredNamespaces: requiredNamespaces,
        });
        setIsCreatingUri(false);
        if (uri) {
          if (!isMobile) {
            console.log("URI:", uri);
            setWalletConnectModalUri(uri);
            setIsConnecting(true);
          } else {
            window.location.replace(`ternoa-wallet://wc?uri=${uri}`);
          }
        }
        const session = await approval();
        console.log("Established session:", session);
        onSessionConnected(session);
        return session;
      } catch (e) {
        console.error(e);
        return null;
        // ignore rejection
      } finally {
        setIsConnecting(false);
        setIsCreatingUri(false);
        if (!isMobile) {
          setWalletConnectModalUri(undefined);
        }
      }
    },
    [client, currentNetwork.ternoaChain, onSessionConnected, isMobile]
  );

  const disconnect = useCallback(async () => {
    console.log("disconnect", session);
    if (typeof client === "undefined") {
      throw new Error("WalletConnect is not initialized");
    }
    if (typeof session === "undefined") {
      throw new Error("Session is not connected");
    }
    try {
      setIsDisconnecting(true);
      await client.disconnect({
        topic: session.topic,
        reason: ERROR.USER_DISCONNECTED.format(),
      });
      // Reset app state after disconnect.
      reset();
    } finally {
      setIsDisconnecting(false);
    }
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
        projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
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

  const request = async (hash: string, txType: TxType) => {
    if (client) {
      try {
        setRequestError(undefined);
        setRequestTxType(txType);
        setRequestHash(hash);
        setRequestLoadingState("loading");
        return await client.request<string>({
          chainId: currentNetwork.ternoaChain,
          topic: session!.topic,
          request: {
            method: "sign_message",
            params: {
              pubKey: account,
              request: {
                nonce: 1,
                validity: null,
                submit: false,
                hash,
              },
            },
          },
        });
      } catch (err) {
        console.error(err);
        if (err && (err as any).code === -32000) {
          setRequestError(
            new WalletConnectRejectedRequest("The request has been rejected")
          );
        } else if (err instanceof Error) {
          console.error(err);
          setRequestError(err);
        }
      } finally {
        setRequestLoadingState("finished");
      }
    } else {
      throw new Error("Client not available");
    }
  };

  useEffect(() => {
    if (!client && !initialized.current) {
      initialized.current = true;
      createClient();
    }
  }, [client, createClient]);

  useEffect(() => {
    if (currentNetwork && isConnected) {
      disconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNetwork.name]);

  return (
    <WalletConnectClientContext.Provider
      value={{
        pairings,
        isInitializing,
        isConnecting,
        isDisconnecting,
        isConnected,
        account,
        client,
        session,
        connect,
        disconnect,
        request,
        requestTxType,
        requestLoadingState,
        requestError,
        requestHash,
        isCreatingUri,
      }}
    >
      <WalletConnectModal
        isOpened={Boolean(walletConnectModalUri)}
        onClose={() => {
          setWalletConnectModalUri(undefined);
          setIsConnecting(false);
        }}
        uri={walletConnectModalUri}
      />
      <WalletConnectRequestModals />
      {children}
    </WalletConnectClientContext.Provider>
  );
};
