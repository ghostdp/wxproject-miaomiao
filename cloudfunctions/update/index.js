// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "dev-ghost"
})

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  try {

    if (typeof event.data == 'string'){
      event.data = eval('('+event.data+')');
    }

    if( event.doc ){
      return await db.collection(event.collection)
        .doc(event.doc)
        .update({
          data: {
            ...event.data
          }
        })
    }
    else{
      return await db.collection(event.collection)
        .where({ ...event.where })
        .update({
          data: {
            ...event.data
          }
        })
    }
  } catch (e) {
    console.error(e)
  }
}