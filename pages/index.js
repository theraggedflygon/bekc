import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import Upload from "../components/upload";
import ColumnsModal from "../components/columsModal";
import SlopeTable from "../components/slopeTable";
import SlopeGraph from "../components/slopeGraph";
import { useEffect, useState } from "react";
import DataGraphs from "../components/dataGraphs";
import { fitLogistic, evalLogistic, getMaxSlope } from "../scripts/curveFit";

export default function Home() {
  const [datasets, setDatasets] = useState([]);
  const [fits, setFits] = useState([]);
  const [slopes, setSlopes] = useState([]);
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
      const maxSlopes = Array(datasets.length - 3);
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
        const slopeVals = getMaxSlope(
          params.L,
          params.k,
          params.x0,
          params.D,
          xVals
        );
        newFits[i - 3] = newVals;
        maxSlopes[i - 3] = {
          idx: i,
          conc: headers[i],
          velo: slopeVals.slope,
          x: slopeVals.ptX,
          y: slopeVals.ptY,
          percentMax: 0,
        };
      }
      setFits(newFits);
      maxSlopes.sort((s1, s2) => (s1.velo > s2.velo ? -1 : 1));
      for (let i = 0; i < maxSlopes.length; i++) {
        maxSlopes[i].percentMax = maxSlopes[i].velo / maxSlopes[0].velo;
        if (maxSlopes[i].percentMax < 0) {
          maxSlopes[i].percentMax = 0;
        }
      }
      maxSlopes.sort((s1, s2) => (s1.idx > s2.idx ? 1 : -1));
      setSlopes(maxSlopes);
    }
  }, [datasets, modalData.settings.useTime, headers]);

  // updates labels on slope table
  useEffect(() => {
    const newSlopes = JSON.parse(JSON.stringify(slopes));
    for (let i = 0; i < modalData.labels.length; i++) {
      newSlopes[i].conc = modalData.labels[i];
    }
    setSlopes(newSlopes);
  }, [modalData.labels]);

  const clearModal = () => {
    setModalData({
      labels: [],
      control: [],
      settings: { plotTemp: false, useTime: true },
    });
    setSlopes([]);
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
      />
      <DataGraphs
        modalData={modalData}
        datasets={datasets}
        fits={fits}
        slopes={slopes}
      />
      {modalShow && (
        <ColumnsModal
          headers={headers}
          setModalShow={setModalShow}
          modalData={modalData}
          setModalData={setModalData}
        />
      )}
      {slopes.length > 0 && modalData.labels && modalData.labels.length > 0 && (
        <div className="flex flex-row">
          <SlopeTable slopes={slopes} />
          <SlopeGraph slopes={slopes} />
        </div>
      )}
      <div className="text-center bottom-0">
        <a
          href="https://github.com/theraggedflygon"
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 text-blue-800"
        >
          Created by Ben Weiner
        </a>
      </div>
    </div>
  );
}
