import { Vue, Render } from 'av-ts';
import { VNode } from 'vue';

export function TSX(target: Vue, key: string, descriptor: TypedPropertyDescriptor<any>) {
	Render(target, 'render', descriptor);
	const render = descriptor.value;

	// Convert React createElement call to Vue format.
	descriptor.value = function(createElement: typeof Vue.prototype.$createElement) {
		return(render.call(this, {createElement: (kind: string, opts: any, ...children: (VNode | string)[]) => {
			if(kind == 'slot') return(this.$slots[(opts && opts.name) || 'default']);

			/** Special attribute names. */

			const specialTbl: { [key: string]: boolean } = {
				class: true,
				key: true,
				ref: true,
				slot: true,
				style: true
			}

			/** Special attribute name prefixes. */

			const prefixTbl: { [key: string]: boolean } = {
				domProps: true,
				nativeOn: true,
				on: true
			}

			const data: any = {};

			for(let key of Object.keys(opts || {})) {
				if(specialTbl[key]) {
					data[key] = opts[key];
					continue;
				}

				// const prefix = (key.match(/^([^-]+)-/) || [])[1];
				let splitPos = key.indexOf('-');
				let prefix = (splitPos < 0 ? '' : key.substr(0, splitPos));

				if(!prefixTbl[prefix]) {
					splitPos = -1;
					prefix = 'attrs';
				}

				let group = data[prefix];
				if(typeof(group) != 'object') data[prefix] = group = {};

				group[key.substr(splitPos + 1)] = opts[key];
			}

			// createElement will extract component props from data.attrs.
			return(createElement(kind, data, children));
		}}));
	}
}
