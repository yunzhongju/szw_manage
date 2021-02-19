// 获取时间
export function getTime(){
	let date=new Date()
	let y=date.getFullYear();
	let m=date.getMonth()+1;
	let d=date.getDate()
	return y+'年'+m+'月'+d+'日'
}

