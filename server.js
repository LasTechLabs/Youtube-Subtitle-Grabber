const getSubtitles = require('youtube-captions-scraper').getSubtitles;
const rp = require('request-promise-native');
const express = require('express')
const fs = require('fs')
const app = express()
const port = 1235

app.listen(port,()=>{
    console.log(`Listening on port: ${port}!`)
})

app.get('/', async (req, res) =>{
  if(req.query.state === "0"){
      [properties, LPList] = await Promise.all([readJSONFromFile("properties"), readJSONFromFile("LPList")])
      try{
        let subtitles = await getSubs(LPList[`${properties.curr}`].url.split("=")[1])
        res.status(200).send({"subtitles":subtitles, "entry":LPList[`${properties.curr}`], "continueFrom":`${properties.lastTime}`})
      }catch(err){
        console.log(err)
        res.status(404).send({"ERROR":"No Subtitles Found", "entry":LPList[`${properties.curr}`], "continueFrom":`${properties.lastTime}`})
      }

    }else if(req.query.state === "submit"){
      if(req.query.time != undefined){
        LPList[properties.curr].starttime = req.query.time
        await saveJSONFile(LPList, "LPList")
      }
      if(req.query.questions!=undefined){
        LPList[properties.curr].cotd = []
        q = req.query.questions.split(",,")
        a = req.query.answers.split(",,")
        a.forEach((qapair, i)=>{
          LPList[properties.curr].cotd[i] = {"question": q[i].split("~")[0],"qname":q[i].split("~")[1], "answer": a[i]}
        })
        await saveJSONFile(LPList, "LPList")
        properties.curr+=1
        if(req.query.continueFrom != undefined){
          properties.lastTime = req.query.continueFrom
        }
        await saveJSONFile(properties, "properties")
      }
      res.status(200).send({})

    }else if(req.query.state === "-1"){
      try{
        let subtitles = await getSubs(req.query.compilation)
        res.status(200).send({"subtitles":subtitles, "entry":LPList[`${properties.curr}`], "continueFrom":`${properties.lastTime}`})
      }catch(err){
        console.log(err)
        res.status(404).send({"ERROR":"No Subtitles Found In Compilation Either", "entry":LPList[`${properties.curr}`], "continueFrom":`${properties.lastTime}`})
      }
    }else if(req.query.state == "-2"){
		try{
			let rtn = await Promise.all([getSubs(req.query.id), getVideoDetails(req.query.id)])
			res.status(200).send({"subtitles":rtn[0], "VidDetails":rtn[1].title})
		}catch(err){
			console.log(err)
			res.status(404).send("ERROR NO SUBTITLES FOUND")
		}
	}else if(req.query.state == undefined){
      res.sendFile(__dirname + "/YouTubeSubtitleGrabber.html")
    }else if(Number.isInteger(parseInt(req.query.state))){
      try{
        let subtitles = await getSubs(LPList[`${req.query.state}`].url.split("=")[1])
        res.status(200).send({"subtitles":subtitles, "entry":LPList[`${properties.curr}`], "continueFrom":`${properties.lastTime}`})
      }catch(err){
        console.log(err)
        res.status(404).send({"ERROR":"No Subtitles Found", "entry":LPList[`${req.query.state}`], "continueFrom":`${properties.lastTime}`})
      }
    }
})



app.get('/YouTubeSubtitleGrabber.css', (req, res) =>{
    res.sendFile(__dirname + "/YouTubeSubtitleGrabber.css")
})
app.get('/YouTubeSubtitleGrabber.js', (req, res) =>{
  res.sendFile(__dirname + "/YouTubeSubtitleGrabber.js")
})
app.get('/YTembedAPI.js', (req, res) =>{
  res.sendFile(__dirname + "/YTembedAPI.js")
})


function readJSONFromFile(fileName){
  return new Promise((resolve)=>{
    fs.readFile(`./${fileName}.json`, "utf8", (err,data)=>{
      list = JSON.parse(data)
      resolve(list)
    })
  })
}

function saveJSONFile(jsonObject, fileName){
  return new Promise((resolve)=>{
    r = JSON.stringify(jsonObject)
    fs.writeFile(`./${fileName}.json`, r, (err)=>{
      if (err){console.log(err)}
      resolve()
    })
  })
}

function getSubs(videoID){
  return new Promise((resolve, reject)=>{
    getSubtitles({
      videoID: `${videoID}`, // youtube video id
      lang: 'en' // default: `en`
    }).then(function(captions) {
      resolve(captions)
    }).catch(err=>{
      reject(err)
    });
  })
}

function getVideoDetails(videoID){
	return new Promise(async (resolve, reject)=>{
		try{
			let VD = await rp(`https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${videoID}&format=json`)
				VD = JSON.parse(VD)
				resolve(VD)
		}catch(err){
			console.log(err)
			reject()
		}
	})
	
}