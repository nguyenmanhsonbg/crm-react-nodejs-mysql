import Layout from "@/layout/Layout";
import { ContentHome1, ContentHome2, ContentHome3 } from "@/components/home";
import { useEffect, useState } from "react";
import React from 'react';
export default function Home() {
  const [widthScreen, setWidthScreen] = useState(window.innerWidth);
  useEffect(()=> {
    window.addEventListener("resize", ()=> {
      setWidthScreen(window.innerWidth)
    });
    return () => 
      window.removeEventListener("resize", ()=> {
      setWidthScreen(window.innerWidth)
    })
  }, [])

    return (
      <Layout>
        <></>
      </Layout>
    );
}