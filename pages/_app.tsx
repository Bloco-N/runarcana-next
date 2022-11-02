import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import useDarkTheme from '../hooks/useDarkTheme';
import RenderWhenMounted from '../components/RenderWhenMounted';
import { ApolloProvider } from "@apollo/client";
import client from '../utils/apolloClient'

export default function App({ Component, pageProps }: AppProps) {
  const isActive = useDarkTheme()

  const particlesInit = useCallback(async (engine:any) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container:any) => {}, []);

  return (
    <>
      <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: isActive ?"#000000" : '#e2e2e2',
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
              value: isActive ?"#93a2bf" : '#2c0e1f',
            },
            links: {
              color: isActive ?"#93a2bf" : '#2c0e1f',
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
              speed: 3,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 1000,
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
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
      <ApolloProvider client={client}>
        <RenderWhenMounted>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RenderWhenMounted>
      </ApolloProvider>
    </>
  )
}
