let currentDriverId;
let hasLike;
let thisMachineIpDatas;

async function FetchDataFromDatabase() {
    const { data, error } = await SupaClientRef
    .from('stars_for_each_driver')
    .select()

    if(error != null) {console.error(error); return;}

    DataStarDriver = data;
    
    console.log(DataStarDriver);

    thisMachineIpDatas = await GetIpData();
    
    UpdateStarsDataForDriver(DataStarDriver);
    await CheckIpStarsSlot(this);
    
}

function UpdateStarLook(status)
{
    const starSvg = document.querySelector('.driverStar')

    if(status == 0)
    {
        starSvg.style.fill = '#e6bf00';
    }
    else if (status == 1)
    {
        starSvg.style.fill = 'rgb(78, 78, 78)';
    }
}

function UpdateStarsDataForDriver(drivers)
{
    const params = new URLSearchParams(window.location.search);
    const driver = params.get("id");
    currentDriverId = driver;
    const currentDriver = drivers.find(item => item.id === driver);
    if (currentDriver != null){
        const starIndicator = document.querySelector('.starCount');
        starIndicator.textContent = currentDriver.stars;

        return;
    }
    console.error(currentDriver + " have not been found on our database!")
}

async function CheckIpStarsSlot() {

    const {data, error} = await SupaClientRef
        .from('ips_starsAvailable')
        .select()
        .eq('ip', thisMachineIpDatas.ip_address);
    
    if(error!=null){console.error(error); return;}

    console.log(data)
    if(data.length > 0 && (data[0].StarGivenToIdSlot1 == currentDriverId || data[0].StarGivenToIdSlot2 == currentDriverId))
    {
        UpdateStarLook(0)
        hasLike = true;
        return;
    }
    hasLike = false;
    console.log("Nothing Found");
    
}

let starContainer;

function animateStar(over)
{
    const driverStar = document.querySelector('.driverStar');
    
    //if(STAR NOT GIVEN)
    switch(over)
    {
        case "over":
            hasLike ? driverStar.style.width = "60px" : driverStar.style.width = "70px";
            hasLike ? driverStar.style.height = "60px" : driverStar.style.height = "70px";
            driverStar.style.fill = '#c7b24756';
            return;
        case "out":
            driverStar.style.width = "60px";
            driverStar.style.height = "60px";
            hasLike ? driverStar.style.fill = '#e6bf00' : driverStar.style.fill = 'rgb(78, 78, 78)';
            return;
        default:
            console.error("VALUE NOT DEFINED! PROBABLY PASSED TROHUGH CONSOLE BROWSER! [FORBIDDEN!!]")
        return;
    }
}

function ToggleErrorPanel(mode){
    switch (mode) {
        case "close":
            setPanel("", true);
            return;

        case "vpnError":
            setPanel("ERROR: you are using a vpn! IT GOES AGAINST OUR RULES! Disable it and then you can access the function");
            break;

        case "starsLimitExceded":
            setPanel("You can give only 2 stars. You have already used them.");
            break;

        case "requestsLimitExceded":
            setPanel("You have exceeded the request limit! Please wait a moment and then try again.");
            break;
        case "betaFeature":
            setPanel("This feature is currently in beta testing, so please report any bugs you find! DATA WILL BE RESETED AT THE END OF THE BETA PHASE!.", false, true);
            break;

        default:
            setPanel("DEBUG");
            break;
    }
}

let betaShowed = false;
function setPanel(message, close = false, beta = false) {
    
    const modalOverlay = document.querySelector('.modaloverlay');
    const panelTxt = document.querySelector('.starPanelErrText');
    const panel = document.querySelector('.starPanelFail');

    const betaCheckbox = document.querySelector('.dontShowAgainBeta');
    const betaCheckboxLabel = document.querySelector('.dontShowAgainBetaLabel');

    panel.style.display = "inline";
    panelTxt.textContent = message;
    modalOverlay.style.display = "inline";
    
    beta = panelTxt.textContent == "This feature is currently in beta testing, so please report any bugs you find! DATA WILL BE RESETED AT THE END OF THE BETA PHASE!." ? true : false;
    
    if(beta)
    {
        betaCheckbox.style.display = "inline";
        betaCheckboxLabel.style.display = "inline";
        betaShowed = true;
    }
    if(close)
    {
        modalOverlay.style.display = "none";
        panel.style.display = "none";
        if(betaShowed)
        {
            window.localStorage.setItem("showBetaDialogAgain", betaCheckbox.checked);
            betaShowed = false;
        }
    }
    
}

async function GetIpData()
{
    try {
        const response = await fetch(
            'https://ip-intelligence.abstractapi.com/v1/?api_key=687e001e15c34bed850e5ba93525ae61&fields=ip_address,security.is_vpn'
        );
        if(response.status == 429){
        ToggleErrorPanel("requestsLimitExceded"); return null;}
        const ipData = await response.json();

        console.log("ip data:", ipData);
        return ipData;

    } catch (error) {
        console.error(error);
        ToggleErrorPanel("requestsLimitExceded");
    }
    return null;
}

let thisIpStarsData;

async function AddStar() 
{

    if(thisMachineIpDatas.security.is_vpn == true)
    {
        ToggleErrorPanel("vpnError")
        console.error("YOU ARE USING A VPN! YOU ARE NOT ALLOWED TO DO SO!")
        return;
    }
    if(window.localStorage.getItem("showBetaDialogAgain") == null || window.localStorage.getItem("showBetaDialogAgain") == 'false')
    {
        ToggleErrorPanel("betaFeature");
    }

    if(hasLike) {await DeleteStar(); return;}

    if (await IpsGetFromSupa(thisMachineIpDatas.ip_address))
    {
        if(thisIpStarsData[0].StarGivenToIdSlot1 == currentDriverId){console.log("Cant add star! SLOT 1 =>" + thisIpStarsData[0].StarGivenToIdSlot1 + " == " + currentDriverId); return;}
        if(thisIpStarsData[0].StarGivenToIdSlot2 == currentDriverId){console.log("Cant add star! SLOT 2 =>" + thisIpStarsData[0].StarGivenToIdSlot2 + " == " + currentDriverId); return;}

        if(thisIpStarsData[0].StarGivenToIdSlot1 == null && thisIpStarsData[0].StarGivenToIdSlot2 != currentDriverId)
            {
                const {data, error} = await SupaClientRef
                    .from('ips_starsAvailable')
                    .update({ 
                        starsAvailable : thisIpStarsData[0].starsAvailable - 1,
                        StarGivenToIdSlot1 : currentDriverId
                    })
                    .eq('ip', thisMachineIpDatas.ip_address); 

                if(error != null) {console.error(error); return;}
            }
        else if (thisIpStarsData[0].StarGivenToIdSlot2 == null && thisIpStarsData[0].StarGivenToIdSlot1 != currentDriverId)
            {
                const {data, error } = await SupaClientRef
                    .from('ips_starsAvailable')
                    .update({ 
                        starsAvailable : thisIpStarsData[0].starsAvailable - 1,
                        StarGivenToIdSlot2 : currentDriverId
                    })
                    .eq('ip', thisMachineIpDatas.ip_address); 
                
                if(error != null) {console.error(error); return;} 
            }
        
        const {errorAdd} = await SupaClientRef
            .rpc('increment', {did : currentDriverId})

        if(errorAdd != null) {console.error(errorAdd); return;}

        hasLike = true;
        FetchDataFromDatabase();
        UpdateStarLook(0);
    }
}

async function IpsGetFromSupa(thisIp, isDeleteStar = false) 
{
    let thisIpData;
    
    thisIpData = await SelectIpRowFromSupa(thisIp);

    console.log(thisIpData);
    let tries = 0;
    while(tries < 3)
    {
        console.log("Try " + tries + " | ip:" + thisIpData);
        if(tries > 1) {
            thisIpData = await SelectIpRowFromSupa(thisIp);
        }

        if (thisIpData.length > 0)
        {
            if (thisIpData[0].ip != undefined && thisIpData[0].starsAvailable >= 1) 
            {
                console.log("Ip found! " + thisIpData[0].ip + " | Stars remaining to this ip: " + thisIpData[0].starsAvailable);
                thisIpStarsData = thisIpData;
                return true;
            }
            else if (!isDeleteStar)
            {
                console.log("Cant add more stars! " + thisIpData[0].starsAvailable + " Remaining.")
                ToggleErrorPanel("starsLimitExceded")
                thisIpStarsData = thisIpData;
                return false;
            }
            else if (isDeleteStar && thisIpData[0].starsAvailable == 0){
                thisIpStarsData = thisIpData;
                return true;
            }
        }
        else
        {
            console.log("Ip not found in database. Adding you!")

            const {error} = await SupaClientRef
                .from('ips_starsAvailable')
                .insert({ ip: thisIp, starsAvailable: 2 })

            if(error != null) { console.error(error)}
        }
        
        tries++;
    }
    if (tries >= 3) {console.error("Tries Exeded"); return false;}
}

async function DeleteStar() 
{
    if(await IpsGetFromSupa(thisMachineIpDatas.ip_address, true))
    {
        if(thisIpStarsData[0].StarGivenToIdSlot1 == currentDriverId)
            {
                const {error} = await SupaClientRef
                    .from('ips_starsAvailable')
                    .update({ 
                        starsAvailable : thisIpStarsData[0].starsAvailable + 1,
                        StarGivenToIdSlot1 : null
                    })
                    .eq('ip', thisMachineIpDatas.ip_address); 

                if(error != null) {console.error(error); return;}

                const {errorAdd} = await SupaClientRef
                    .rpc('decrement', {did : currentDriverId})
                if(errorAdd != null) {console.error(errorAdd)}

                hasLike = false;
                FetchDataFromDatabase();
                UpdateStarLook(1);
            }
        else if (thisIpStarsData[0].StarGivenToIdSlot2 == currentDriverId)
            {
                const {error} = await SupaClientRef
                    .from('ips_starsAvailable')
                    .update({ 
                        starsAvailable : thisIpStarsData[0].starsAvailable + 1,
                        StarGivenToIdSlot2 : null
                    })
                    .eq('ip', thisMachineIpDatas.ip_address); 
                
                if(error != null) {console.error(error); return;} 

                const {errorAdd} = await SupaClientRef
                    .rpc('decrement', {did : currentDriverId})
                if(errorAdd != null) {console.error(errorAdd)}

                hasLike = false;
                FetchDataFromDatabase();
                UpdateStarLook(1);
            }
    }
}

async function SelectIpRowFromSupa(ipToGetFrom) {
    const {data, error} = await SupaClientRef
        .from('ips_starsAvailable')
        .select()
        .eq('ip', ipToGetFrom)

    if(error != null) {console.error(error); return;}
    return data;
}