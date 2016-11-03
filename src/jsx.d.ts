import { VNode } from 'vue';

declare global {
	namespace JSX {
		interface Element extends VNode {}

		interface ElementAttributesProperty {
			props: any;
		}

		interface IntrinsicElements {
			div: any;
			p: any;
			ul: any;
			li: any;
			span: any;
			slot: any;
		}
	}
}
