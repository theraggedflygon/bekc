import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import Upload from "../components/upload";
import ColumnsModal from "../components/columsModal";
import { useEffect, useState, useMemo } from "react";
import DataGraphs from "../components/dataGraphs";

export default function Home() {
  const [datasets, setDatasets] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({
    labels: [],
    control: [],
    settings: { plotTemp: false, useTime: true },
  });

  const clearModal = () => {
    setModalData({
      labels: [],
      control: [],
      settings: { plotTemp: false, useTime: true },
    });
  };

  return (
    <div className="h-screen flex flex-col">
      <Head>
        <title>BEKC</title>
        <meta name="description" content="Ben's Enzyme Kinetics Calculator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <Upload
        setDatasets={setDatasets}
        setHeaders={setHeaders}
        setModalShow={setModalShow}
        clearModal={clearModal}
      ></Upload>
      <DataGraphs modalData={modalData} datasets={datasets} />
      {modalShow && (
        <ColumnsModal
          headers={headers}
          setModalShow={setModalShow}
          modalData={modalData}
          setModalData={setModalData}
        />
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
