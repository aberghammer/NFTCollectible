import React, { Component } from "react";
import Head from "next/head";

export default function Header(props) {
  let head = null;
  return (head = (
    <Head>
      <title>DYING WORLDS</title>
      <meta name="description" content="DYING WORLDS" />
      <link rel="icon" href="/logo.png" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossorigin="anonymous"
      />
    </Head>
  ));
}