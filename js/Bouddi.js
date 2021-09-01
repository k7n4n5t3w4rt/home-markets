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
import fetchCoordinates from "./actions/fetchCoordinates.js";
import width from "./actions/width.js";
import height from "./actions/height.js";

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
    width: `${width()}px`,
    height: `${height()}px`,
  },
});

/*::
type Props = {
  count: number | typeof undefined
};
*/
const Bouddi = (props /*: Props */) /*: string */ => {
  useEffect(() => {
    // $FlowFixMe
    const map = L.map("map", {
      crs: L.CRS.Simple,
    });
    const bounds = [
      [0, 0],
      [1000, 1000],
    ];
    const image = L.imageOverlay("/img/map_bouddi.png", bounds).addTo(map);
    map.fitBounds(bounds);

    /*:: type Shopfront = {
			URL: string,
			coordinates: {y: number, x: number}
	} */

    fetchCoordinates("bouddi").then((
      shopfronts /*: Array<any > */,
    ) /*: void */ => {
      var StarIcon = L.Icon.extend({
        options: {
          shadowUrl: "../img/blue-star-icon2-shadow.png",
          iconSize: [50, 50], // size of the icon
          shadowSize: [50, 50], // size of the shadow
          iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
          shadowAnchor: [0, 0], // the same for the shadow
          popupAnchor: [25, 25], // point from which the popup should open relative to the iconAnchor
        },
      });

      var starIcon = new StarIcon({ iconUrl: "../img/blue-star-icon2.png" });
      shopfronts.forEach((shopfront /*: Shopfront */) /*: void */ => {
        L.marker([shopfront.coordinates.y, shopfront.coordinates.x], {
          icon: starIcon,
        })
          .addTo(map)
          .bindPopup(`<a href="${shopfront.URL}">Link...</a>`);
      });
      var popup = L.popup();

      function onMapClick(e) {
        popup
          .setLatLng(e.latlng)
          .setContent(
            `You clicked the map at y:${e.latlng.lat - 25}, x:${
              e.latlng.lng - 25
            }`,
          )
          .openOn(map);
      }

      map.on("click", onMapClick);
    });
  }, []);

  // console.log(props.count.isInteger());
  return html`
    <div className="${styles.container}">
      <div id="map" className="${styles.map}"></div>
    </div>
  `;
};

export default Bouddi;
