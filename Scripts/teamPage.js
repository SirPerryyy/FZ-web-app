async function LoadTeamInfo()
{
    const response = await fetch('./Datas/Drivers/TeamsStats.json');
    const data = await response.json();  

    const params = new URLSearchParams(window.location.search);
    const teamID = params.get("id");
    
    const team = data[teamID];

    const teamName = document.querySelector('.teamName');
    if (team === undefined) {
        teamName.innerText = "Error loading team data : TEAM NOT FOUND";
        console.error("Team data not found for ID:", teamID);
        return;
    }

    const teamLogoClass = document.querySelector('.teamLogo');
    const teamBG = document.querySelector('.teamBG');

    teamName.innerText = team.teamName.toUpperCase();
    teamBG.style = team.bG;
    teamLogoClass.src = team.teamLogoSrc;
    if(team.logoFixedSize != undefined)
    {
        teamLogoClass.style = team.logoFixedSize
    }

    const teamCupContainer = document.querySelector('.teamCupContainter');
        
    if(team.Stats.titles > 0)
    {
        for(let x = 1; x <= team.Stats.titles; x++)
        {
            teamCupContainer.innerHTML = teamCupContainer.innerHTML + `<img src="${team.cupSrc}">`;
        }
    }else{
        teamCupContainer.innerText = "None";
    }

    const seasonsP = document.querySelectorAll('.teamSeasonsPanel p')
    const seasonsH2 = document.querySelectorAll('.teamSeasonsPanel h2')

    
    for(let index = 0; index < seasonsP.length; index++)
    {
        let text = team.Seasons[index];
        let newText = text.replace("[CUP]", `<img src="${team.cupSrc}" style="width: 18px; height: 34px;">`);
        
        seasonsP[index].innerHTML = newText;
        seasonsH2[index].style = team.teamColor;
    }

    const statsP = document.querySelectorAll('.teamStatsPanel p');
    const statsH2 = document.querySelectorAll('.teamStatsPanel h2');

    statsP[0].innerText = team.Stats.titles;
    statsP[1].innerHTML = team.Stats.wins;
    statsP[2].innerText = team.Stats.totalPoints;
    statsP[3].innerText = team.Stats.uniqueDrivers;
    statsP[4].innerText = team.Stats.seasonsAttended;
    statsP[5].innerHTML = team.Stats.driversChamps;
    statsP[6].innerText = team.Stats.icon;

    for(let i = 0; i < statsH2.length; i++)
    {
        statsH2[i].style = team.teamColor;
    }

    const images = document.querySelectorAll('.teamImages img');

    for(let i = 0; i < images.length; i++)
    {
        if(team.ImagesSrcs[i] != "")
        {
            images[i].style = "display: inline"
            images[i].src = team.ImagesSrcs[i]; 
        }
    }

}