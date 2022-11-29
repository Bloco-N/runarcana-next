import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { useCallback, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import useDarkTheme from '../hooks/useDarkTheme';
import RenderWhenMounted from '../components/RenderWhenMounted';
import { ApolloProvider } from "@apollo/client";
import client from '../utils/apolloClient'
import Loading from '../components/Loading';
import LoadingContext from '../contexts/LoadingContext';

export default function App({ Component, pageProps }: AppProps) {
  const isActive = useDarkTheme()
  const [loadingLayout, setLoading] = useState(false)

  const particlesInit = useCallback(async (engine: any) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: any) => { }, []);

  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: isActive ? "#11111b" : '#dce0e8',
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "repulse",
              },
              onHover: {
                enable: false,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: isActive ? "#cdd6f4" : '#4c4f69',
            },
            links: {
              color: isActive ? "#cdd6f4" : '#4c4f69',
              distance: 300,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 1500,
              },
              value: 20,
            },
            opacity: {
              value: 1,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 1.3 },
            },
          },
          detectRetina: true,
        }}
      />
      <ApolloProvider client={client}>
        <RenderWhenMounted>
          <Layout>
            <LoadingContext.Provider value={[loadingLayout, setLoading]}>
              {loadingLayout ? <Loading /> : ''}
              <Component {...pageProps} />
            </LoadingContext.Provider>
          </Layout>
        </RenderWhenMounted>
      </ApolloProvider>
    </>
  )
}
