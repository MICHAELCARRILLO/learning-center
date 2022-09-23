import {createApp} from "vue"
import App from "./App.vue"
import router from "./router"
import PrimeVue from "primevue/config";

//primevue theme
import "primevue/resources/themes/md-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css ";

import "./assets/main.css"
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Toolbar from "primevue/toolbar";
import InputText from "primevue/inputtext";

const app = createApp(App)

app.use(router)

//using primevue
app.use(PrimeVue)

//defining prime vue components
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Toolbar", Toolbar);
app.component("InputText", InputText);

app.mount("#app")
