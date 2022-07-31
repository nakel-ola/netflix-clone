import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useDispatch } from "react-redux";
import store from "../redux/app/store";
import { Children, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { login } from "../redux/features/userSlice";
import { useRouter } from "next/router";
import { NextPage } from "next";

function MyApp({ Component, pageProps }: AppProps) {

  
  return (
    <Provider store={store}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </Provider>
  );
}

const Wrapper = ({ children}: {children: any}) => {
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(
    () =>
      onAuthStateChanged(auth, (result) => {
        dispatch(
          login({
            email: result?.email,
            photoURL: result?.photoURL,
            displayName: result?.displayName,
          })
        );
        router.replace("/home");
      }),
    []
  );
  return children
}

export default MyApp;
