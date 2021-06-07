let bearer_token = "BQBfwYibRdi0a5R6DQew1AyiRLG5M5wwucgjUNHbO_bmmMO4AhYCdAP6eRJQ7EQK320vrGe8iKktoASTJ2K_YfqMFS_qHdph9gHJc7dk5eMKdBrFifDx1EGUA5PoJ5kEek0Nv2VEmHNmI7Cr6sa2uw9i9lPtZ0A6TNLviaVkYVuJzFbqviUJh7LWSkanAFn5p_9-9UhZaqSJn-9_tP2MaFLXzm9xLiVWNmeSQYIVIbZLpEUcv_dSaye12pqK7iLem9UqEb8UB7-iU-Vk8kFWKbNb";
let url = "https://api.spotify.com/v1/shows";
let bearer = "Bearer " + bearer_token;

function fetch_featured(){
    let show_id = "2nIvarXvvZcp1cePx69x9N";
    fetch(url+"?ids="+show_id+"&market=US",{
        method:"GET",
        headers:{
            'Authorization':bearer,
            'Accept':'application/json',
            'Content-Type':'application/json',
        }
    })
    .then((data)=>{return data.json()})
    .then((data)=>{
        let show = data.shows[0]
        let featured_html = `
            <div class='featured'>
                <img src='${show.images[1].url}' />
                <div>
                    <h2>${show.name}</h2>
                    <h4>${show.description}</h4>
                    <h3>Don't forget to listen to today's episode!</h3>
                    <button>Listen now</button>
                </div>
            </div>
        `
        document.getElementById("featured").innerHTML = featured_html;
    })
    .catch(console.log);
}


function fetch_latest(){
    let show_id = "2nIvarXvvZcp1cePx69x9N%2C5lY4b5PGOvMuOYOjOVEcb9%2C6xpiit8aJmwDHk1rKdxmri";
    fetch(url+"?ids="+show_id+"&market=US",{
        method:"GET",
        headers:{
            'Authorization':bearer,
            'Accept':'application/json',
            'Content-Type':'application/json',
        }
    })
    .then((data)=>{return data.json()})
    .then((data)=>{
        data.shows.forEach(show => {
            let show_html = `
            <div class='show' onclick='location.href = "show.html?id=${show.id}"'>
                <img src='${show.images[1].url}' />
                <div>
                    <h4>${show.name}</h4>
                    <h5>${show.publisher}</h5>
                </div>
            </div>
            `
            document.getElementById("shows").innerHTML += show_html;
        });
    })
    .catch(console.log)
}


function fetch_all(){
    fetch_featured();
    fetch_latest();
}

function get_show(id){
    fetch(url+"/"+id+"?market=US", {
        method:"GET",
        headers:{
            'Authorization':bearer,
            'Accept':'application/json',
            'Content-Type':'application/json',
        }
    })
    .then((data)=>{return data.json()})
    .then((data)=>{
        document.title = "pod - "+data.name;
        let header_html = `
            <img src='${data.images[1].url}' id="header-img" />
            <div>
                <p>PODCAST</p>
                <h2>${data.name}</h2>
                <h5>${data.publisher}</h5>
            </div>
        `
        document.getElementById("header").innerHTML = header_html;
        document.getElementById("header-small").innerHTML = `<h3>${data.name}</h3>`;

        get_bg();
    })
}



function get_episodes(id){
    fetch(url+"/"+id+"/episodes?market=US", {
        method:"GET",
        headers:{
            'Authorization':bearer,
            'Accept':'application/json',
            'Content-Type':'application/json',
        }
    })
    .then((data)=>{return data.json()})
    .then((data)=>{
        data.items.forEach(episode => {
            let episode_html = `
                <div class="episode">
                
                    <img src="${episode.images[1].url}" />

                    <div class="episode__details">
                        <h2>${episode.name}</h2>
                    </div>
                        
                    <div class="audio">
                        <div class="play__button">
                            <audio src="${episode.audio_preview_url}" controls></audio>
                        </div>
                        <p>Preview</p>
                    </div>

                </div>
            `
            document.getElementById('episodes').innerHTML += episode_html;
        });
    })
}

