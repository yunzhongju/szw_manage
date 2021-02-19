<template>
	<div style="width: 672px;">
		<ckeditor
			style="min-height: 400px; max-height: 620px; border: 1px solid #ccc;"
			:editor="editor"
			@ready="onReady"
			:value="contentData"
			@input="$emit('input', $event)"
			:config="editorConfig"
		></ckeditor>
	</div>
</template>

<script>
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

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
		}
	},
	computed: {

	},
	data() {
		return {
			editor: DecoupledEditor,
			contentData: this.content,
			editorConfig: {
				language: 'zh-cn',
				fontSize: {
					options: [8, 10, 'default', 14, 16, 18, 20, 22, 24, 26, 28, 32, 48]
				},
				fontFamily: {
					options: ['宋体', '仿宋', '微软雅黑', '黑体', '仿宋_GB2312', '楷体', '隶书', '幼圆']
				}
			}
		};
	},
	methods: {
		onReady(editor) {
			// Insert the toolbar before the editable area.
			editor.ui.getEditableElement().parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement());
			editor.plugins.get('FileRepository').createUploadAdapter = loader => {
				//let val = editor.getData();
				return {
					upload: async () => {
						return await loader.file
							.then(f => {
								const F = new FileReader();
								F.readAsArrayBuffer(f);
								console.log(f);
								return new Promise(resolve => {
									F.onload = function() {
										resolve({ bufAsArray: F.result, file: f });
									};
								});
							})
							.then(v => {
								//执行上传上传
								return this.uploadImgHook(v);
							});
					}
				};
			};
		}
	}
};
</script>

<style scoped></style>
