import * as api from 'vue-hot-reload-api';
import { Vue, Component, Render, Lifecycle } from 'av-ts';
import { TSX } from './tsx';
import { Tab } from './Tab';

declare var module: any;
declare var __moduleName: any;

@Component//({template: '{{name}}'})
class App extends Vue {
	name = 'app';

	components = [ Tab ];

	@TSX
	render(React: any) {
		return(
			<charto-tab>
				Hello!
				<div slot="header">QUUX</div>
			</charto-tab>
		);
		// return(h('p', h('p', 'Hello!!')));
	}
}

const key = typeof(__moduleName) == 'string' ? __moduleName : module.id;

if((window as any)['__VUE_HOT_MAP__'][key]) {
	api.reload(key, (App as any).options);
	api.rerender(key, (App as any).options);
} else {
	api.install(Vue);
	api.createRecord(key, (App as any).options);

	new Vue({
		el: '#app',
		// components: { App, Tab },
		render: (h) => h(App)
	});
}
