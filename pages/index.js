import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import Upload from "../components/upload";
import Plot from "../components/plot";
import ColumnsModal from "../components/columsModal";
import { useEffect, useState, useMemo } from "react";

export default function Home() {
  const [datasets, setDatasets] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({
    labels: [],
    control: [],
    settings: { plotTemp: false, useTime: true },
  });

  const colors = useMemo(
    () => [
      "rgba(234, 16, 16, {$A})",
      "rgba(68, 112, 214, {$A})",
      "rgba(68, 214, 115, {$A})",
      "rgba(226, 206, 53, {$A})",
      "rgba(226, 152, 53, {$A})",
      "rgba(53, 213, 226, {$A})",
      "rgba(159, 53, 226, {$A})",
      "rgba(34, 111, 22, {$A})",
      "rgba(27, 21, 88, {$A})",
      "rgba(88, 21, 21, {$A})",
    ],
    []
  );

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
      <div className="flex flex-row">
        <div className="w-1/2 h-[36rem]">
          {modalData.labels.filter((l) => l !== "").length ===
            datasets.length - 3 && (
            <Plot
              xSeries={modalData.settings.useTime ? datasets[1] : datasets[0]}
              datasets={datasets.slice(3)}
              labels={modalData.labels}
            ></Plot>
          )}
        </div>
        <div className="w-1/6 h-[12rem]">
          {datasets
            .slice(3)
            .map((ds, idx) =>
              idx % 3 === 0 ? (
                <Plot
                  xSeries={
                    modalData.settings.useTime ? datasets[1] : datasets[0]
                  }
                  datasets={[ds]}
                  labels={[modalData.labels[idx]]}
                  setColors={[colors[idx]]}
                ></Plot>
              ) : null
            )}
        </div>
        <div className="w-1/6 h-[12rem]">
          {datasets
            .slice(3)
            .map((ds, idx) =>
              idx % 3 === 1 ? (
                <Plot
                  xSeries={
                    modalData.settings.useTime ? datasets[1] : datasets[0]
                  }
                  datasets={[ds]}
                  labels={[modalData.labels[idx]]}
                  setColors={[colors[idx]]}
                ></Plot>
              ) : null
            )}
        </div>
        <div className="w-1/6 h-[12rem]">
          {datasets
            .slice(3)
            .map((ds, idx) =>
              idx % 3 === 2 ? (
                <Plot
                  xSeries={
                    modalData.settings.useTime ? datasets[1] : datasets[0]
                  }
                  datasets={[ds]}
                  labels={[modalData.labels[idx]]}
                  setColors={[colors[idx]]}
                ></Plot>
              ) : null
            )}
        </div>
      </div>
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
