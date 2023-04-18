import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import Upload from "../components/upload";
import ColumnsModal from "../components/columsModal";
import { useEffect, useState, useMemo } from "react";
import DataGraphs from "../components/dataGraphs";
import { fitLogistic, evalLogistic } from "../scripts/curveFit";

export default function Home() {
  const [datasets, setDatasets] = useState([]);
  const [fits, setFits] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({
    labels: [],
    control: [],
    settings: { plotTemp: false, useTime: true },
  });

  useEffect(() => {
    if (datasets.length > 3) {
      const newFits = Array(datasets.length - 3);
      const xVals = modalData.settings.useTime ? datasets[1] : datasets[0];
      for (let i = 3; i < datasets.length; i++) {
        const params = fitLogistic(xVals, datasets[i]);
        const newVals = evalLogistic(
          params.L,
          params.k,
          params.x0,
          params.D,
          xVals
        );
        newFits[i - 3] = newVals;
      }
      setFits(newFits);
    }
  }, [datasets, modalData.settings.useTime]);

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
        headers={headers}
        setHeaders={setHeaders}
        setModalShow={setModalShow}
        clearModal={clearModal}
      ></Upload>
      <DataGraphs modalData={modalData} datasets={datasets} fits={fits} />
      {modalShow && (
        <ColumnsModal
          headers={headers}
          setModalShow={setModalShow}
          modalData={modalData}
          setModalData={setModalData}
        />
      )}
      <div>This is where the slope table will go!</div>

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
