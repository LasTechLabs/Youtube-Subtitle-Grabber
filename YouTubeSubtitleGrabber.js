document.addEventListener("DOMContentLoaded", ()=>{
	document.getElementsByClassName("captionsText")[0].style.height = `${document.getElementsByTagName("iframe")[0].offsetHeight}px`
	
	
	document.getElementsByTagName("BUTTON")[0].addEventListener("click", async ()=>{
		if(document.getElementById("modeProject").checked == true){
		let questions = "", answers = ""
		completedText = document.getElementsByClassName("captionsText")[0].value.split("\n")
		if(completedText.length%2==0){
		    completedText.forEach((qora, j)=>{
			j%2==0? (questions == ""? questions = `${qora}`: questions = `${questions},,${qora}`) : (answers == "" ? answers = `${qora}`:answers = `${answers},,${qora}`)
		    })
		    if(subs){
			submit = await fetch(`http://${window.location.hostname}:1235/?state=submit&questions=${questions}&answers=${answers}`)
		    }else{
			submit = await fetch(`http://${window.location.hostname}:1235/?state=submit&questions=${questions}&answers=${answers}&continueFrom=${getTime()}`)
		    }
		    if(submit.status == 200){
			load(parseInt(currentEntry)+1)
		    }
		}else{
		    console.log("There is not an answer for every question...")
		}	
		load(0)		
		}else{
			let dtl = []
		dtl = await fetch(`http://${window.location.hostname}:1235/?state=-2&id=${document.getElementsByClassName("searchBar")[0].value.split("v=")[1].split("&")[0]}`)
		if(dtl.status == 200){
			dtl = await dtl.json()
			rgl(dtl)
		}else{
			console.log("ERROR")
		}
		
	}
	})
})

window.addEventListener("resize", ()=>{
	document.getElementsByClassName("captionsText")[0].style.height = `${document.getElementsByTagName("iframe")[0].offsetHeight}px`
})

async function rgl(sstl){
	document.getElementsByClassName("epBar")[0].value = sstl.VidDetails
	document.getElementsByTagName("iframe")[0].src = `https://www.youtube.com/embed/${document.getElementsByClassName("searchBar")[0].value.split("v=")[1].split("&")[0]}?enablejsapi=1`
	document.getElementsByClassName("captionsText")[0].value = ""
            Object.keys(sstl.subtitles).forEach((key, i)=>{
                document.getElementsByClassName("captionsText")[0].value += sstl.subtitles[key].text+" "
        })
}

async function load(state){
    details = await fetch(`http://${window.location.hostname}:1235/?state=${state}`)
    status = details.status
    details = await details.json()
    currentEntry = details.entry.seriesNumber
    document.getElementsByClassName("epBar")[0].value = `${details.entry.seriesNumber}: ${details.entry.title}`
    document.getElementsByClassName("searchBar")[0].value = details.entry.url
    document.getElementsByTagName("iframe")[0].src = `https://www.youtube.com/embed/${details.entry.url.split("=")[1]}?enablejsapi=1`
    
    if(status == 200){
        //subs on project video
        subs = true
        document.getElementsByClassName("captionsText")[0].value = ""
            Object.keys(details.subtitles).forEach((key, i)=>{
                document.getElementsByClassName("captionsText")[0].value += details.subtitles[key].text+" "
        })
    }else{
        //no subs on project video so load backup
        document.getElementsByClassName("captionsText")[0].value = "No Subtitles Found"
        subs = false
        SN = parseInt(details.entry.seriesNumber)
            if(SN>=204 && SN<=250){
                compURL = `https://www.youtube.com/embed/XZ3Fg4VJ5b4?enablejsapi=1&start=${parseInt(details.continueFrom)}`
            }else if(SN>250 && SN<=300){
                compUrl = `https://www.youtube.com/embed/iG8-sKR_6Ew?enablejsapi=1&start=${parseInt(details.continueFrom)}`
            }else if(SN>300 && SN<=350){
                compUrl = `https://www.youtube.com/embed/B7KT7YODB2E?enablejsapi=1&start=${parseInt(details.continueFrom)}`
            }else if(SN>350 && SN<=400){
                compURL = `https://www.youtube.com/embed/DVz7lOL2LXs?enablejsapi=1&start=${parseInt(details.continueFrom)}`
            }else if(SN>400 && SN<=450){
                compURL = `https://www.youtube.com/embed/hn1dadGhJx4?enablejsapi=1&start=${parseInt(details.continueFrom)}`
            }else if(SN>450 && SN<=500){
                compURL = `https://www.youtube.com/embed/Tom8q1ARApE?enablejsapi=1&start=${parseInt(details.continueFrom)}`
            }else{
                compURL = `https://www.youtube.com/embed/uAI81Lzx02Q?enablejsapi=1&start=${parseInt(details.continueFrom)}`
            }
            document.getElementsByTagName("iframe")[0].src = compURL
            dt = await fetch(`http://${window.location.hostname}:1235/?state=-1&compilation=${compURL.split("/")[4].split("?")[0]}`)
            status = dt.status
            dt = await dt.json()
            if(status == 200){          
                document.getElementsByClassName("captionsText")[0].value = ""
                Object.keys(dt.subtitles).forEach((key, i)=>{
                    document.getElementsByClassName("captionsText")[0].value += dt.subtitles[key].text+" "
                })
            }
    }
}



