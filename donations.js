const bg = document.querySelector('.modaloverlay');
const panelGood = document.querySelector('.donationsPanelDone');
const panelFail = document.querySelector('.donationsPanelFail');

function DonationRead()
{
    const params = new URLSearchParams(window.location.search);

    var donation = 0;
    
    donation = Number(params.get("donVal"));


    if (donation === 1)
    {
        bg.style.display = "inline";
        panelGood.style.display = "inline";

        console.log("donation success!" + donation)
        FireworksConfetti();
    }
    else if (donation === -1)
    {
        bg.style.display = "inline";
        panelFail.style.display = "inline";

        console.log("donation cancelled!" + donation)
    }

    console.log(donation);
}
function RedirectPayPal()
{
    window.location.href = 'https://www.paypal.com/donate/?hosted_button_id=Q64WX7D7WCGVA';
}

function Close(type){
    window.location.href = `index.html`;
    bg.style.display = "none";
    if(type === "good"){
        panelGood.style.display = "none";
    }
    else if (type === "fail")
    {
        panelFail.style.display = "none";
    }
}

function FireworksConfetti()
{
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 3 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
    var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
}


