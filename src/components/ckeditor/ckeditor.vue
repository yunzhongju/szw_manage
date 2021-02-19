<template>
	<div style="width: 100%;">
		<ckeditor
			:style="{ height: height, border: '1px solid #ccc' }"
			:editor="editor"
			@ready="onReady"
			:value="text"
			@input="$emit('input', $event)"
			:config="editorConfig"
		></ckeditor>
	</div>
</template>

<script>
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import DecoupledEditor from '@ckeditor/ckeditor5-build-classic';
// import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
import UploadImageAdapter from './editor.js';
export default {
	name: 'V5',
	model: {
		prop: 'content',
		event: 'input'
	},
	props: {
		uploadImgHook: {
			type: Function,
			default() {
				return () => {
					console.error('undefined uploadImg Hook');
				};
			}
		},
		text: {
			type: String,
			default: '<p>请编辑内容</p>'
		},
		height: {
			type: String,
			default: '400px'
		}
	},
	computed: {
		// contentData() {
		// 	return this.content;
		// }
	},
	data() {
		return {
			editor: DecoupledEditor,
			contentData: this.content,
			editorConfig: {
				toolbar: {
					items: [
						'heading',
						'|',
						'removeFormat',
						'|',
						'fontSize',
						'fontFamily',
						'fontBackgroundColor',
						'|',
						'bold',
						'italic',
						'underline',
						'strikethrough',
						'highlight',
						'|',
						'alignment',
						'|',
						'numberedList',
						'bulletedList',
						'|',
						'indent',
						'outdent',
						'|',
						'todoList',
						'link',
						'blockQuote',
						'imageUpload',
						'imageInsert',
						'insertTable',
						'mediaEmbed',
						'CKFinder',
						'htmlEmbed',
						'|',
						'undo',
						'redo'
					]
				},
				image: {
					toolbar: [
						'imageTextAlternative',
						'imageStyle:full',
						'imageStyle:side',
						'linkImage'
					]
				},
				table: {
					contentToolbar: [
						'tableColumn',
						'tableRow',
						'mergeTableCells',
						'tableCellProperties',
						'tableProperties'
					]
				},
				language: 'zh-cn',
				fontSize: {
					options: [8, 10, 'default', 14, 16, 18, 20, 22, 24, 26, 28, 32, 48]
				},
				fontFamily: {
					options: ['宋体', '仿宋', '微软雅黑', '黑体', '仿宋_GB2312', '楷体', '隶书', '幼圆']
				},
			}
		};
	},
	methods: {
		onReady(editor) {
			// Insert the toolbar before the editable area.
			editor.ui.getEditableElement().parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement());
			editor.plugins.get('FileRepository').createUploadAdapter = loader => {
				//let val = editor.getData();
				return new UploadImageAdapter(this, loader);
			};
			
			
		}
	}
};
</script>

<style scoped></style>
