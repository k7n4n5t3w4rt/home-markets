// @flow
import { h } from "../web_modules/preact.js";
import Counter from "./Bouddi.js";
import Bouddi from "./Bouddi.js";
import Router from "../web_modules/preact-router.js";
import { html } from "../web_modules/htm/preact.js";
import { AppProvider } from "./AppContext.js";

/*::
type Props = {
  url: string
};
*/
const App /*: function */ = (props /*: Props */) => {
  return html`
    <${AppProvider} >
      <${Router} url="${props.url}">
        <${Bouddi} path="/" />
        <${Bouddi} path="/bouddi" />
      </${Router}>
    </${AppProvider} >
  `;
};

export default App;
