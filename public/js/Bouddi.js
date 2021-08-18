// @flow
import { h, render } from "../web_modules/preact.js";
import {
  useContext,
  useEffect,
  useState,
} from "../web_modules/preact/hooks.js";
import { html } from "../web_modules/htm/preact.js";
import {
  rawStyles,
  createStyles,
  setSeed,
} from "../web_modules/simplestyle-js.js";
import { AppContext } from "./AppContext.js";

const seed /*: number */ = parseInt(
  "Bouddi".split("").reduce(
    (acc /*: string */, letter /*: string */) /*: string */ => {
      const letterCode = letter.toLowerCase().charCodeAt(0) - 97 + 1;
      return acc + letterCode.toString();
    },
    "",
  ),
);
setSeed(seed);

rawStyles({
  html: {
    height: "100%",
  },
  body: {
    height: "100%",
  },
});

const [styles] = createStyles({
  container: {
    fontFamily: "sans-serif",
    textAlign: "center",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  map: {
	  width: "640px",
	  height: "480px",
  }
});

/*::
type Props = {
  count: number | typeof undefined
};
*/
const Bouddi = (props /*: Props */) /*: string */ => {

  useEffect(() => {
	// $FlowFixMe
	const map = L.map('map', {
		crs: L.CRS.Simple
	});

	const bounds = [[0,0], [1000,1000]];
	const image = L.imageOverlay('/img/uqm_map_full.png', bounds).addTo(map);

	map.fitBounds(bounds);
  }, []);

  // console.log(props.count.isInteger());
  return html`
    <div className="${styles.container}">
		<div id='map' className="${styles.map}"></div>
    </div>
  `;
};

export default Bouddi;