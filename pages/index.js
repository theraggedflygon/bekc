import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import Upload from "../components/upload";
import ColumnsModal from "../components/columsModal";
import { useState } from "react";

export default function Home() {
  const [datasets, setDatasets] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <Head>
        <title>BEKC</title>
        <meta name="description" content="Ben's Enzyme Kinetics Calculator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <Upload setDatasets={setDatasets} setModalShow={setModalShow}></Upload>
      <h1 className="text-4xl text-blue-500 text-center">{datasets.length}</h1>
      {modalShow && (
        <ColumnsModal datasets={datasets} setModalShow={setModalShow} />
      )}

      {/* <footer className={styles.footer}>
        <a
          href="https://github.com/theraggedflygon"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by Ben Weiner
        </a>
      </footer> */}
    </div>
  );
}
