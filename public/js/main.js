if(document.getElementById('proceed'))
{
    selectedItem = 1;
    var ppr = document.getElementById('proceed');
    cif1 = 0;
    cif2 = 0;
    cif3 = 0;
    ctf1 = 0;
    ctf2 = 0;
    ctf3 = 0;
    function instagramCounting(){
    let lif1 = document.querySelector('label[for="if1"]');
    let bif1p = document.querySelector('button.plus[target="if1"]');
    let bif1m = document.querySelector('button.minus[target="if1"]');
    bif1p.onclick = ()=>{
        cif1+=1;
        lif1.innerText = cif1;
        if(bif1m.hasAttribute('disabled') && cif1>0) bif1m.removeAttribute('disabled');
        itotal()
    }
    bif1m.onclick = () => {
        if(cif1 == 0) return;
        cif1-=1;
        lif1.innerText = cif1;
        if(cif1 <=0) bif1m.setAttribute('disabled','');
        itotal()
    }
    let lif2 = document.querySelector('label[for="if2"]');
    let bif2p = document.querySelector('button.plus[target="if2"]');
    let bif2m = document.querySelector('button.minus[target="if2"]');
    bif2p.onclick = ()=>{
        cif2+=1;
        lif2.innerText = cif2;
        if(bif2m.hasAttribute('disabled') && cif2>0) bif2m.removeAttribute('disabled');
        itotal()
    }
    bif2m.onclick = () => {
        if(cif2 == 0) return;
        cif2-=1;
        lif2.innerText = cif2;
        if(cif2 <=0) bif2m.setAttribute('disabled','');
        itotal()
    }
    let lif3 = document.querySelector('label[for="if3"]');
    let bif3p = document.querySelector('button.plus[target="if3"]');
    let bif3m = document.querySelector('button.minus[target="if3"]');
    bif3p.onclick = ()=>{
        cif3+=1;
        lif3.innerText = cif3;
        if(bif3m.hasAttribute('disabled') && cif3>0) bif3m.removeAttribute('disabled');
        itotal()
    }
    bif3m.onclick = () => {
        if(cif3 == 0) return;
        cif3-=1;
        lif3.innerText = cif3;
        if(cif3 <=0) bif3m.setAttribute('disabled','');
        itotal()
    }
    function itotal()
    {
        let t = (cif1*1.49)+(cif2*7.29)+(cif3*13.99);
        let followers = (cif1*1000)+(cif2*5000)+(cif3*10000);
        if(t == 0 || followers == 0 && selectedItem == 1) ppr.setAttribute('disabled','');
        else if(selectedItem == 1) ppr.removeAttribute('disabled');
        
        document.querySelector('.offer .total[target="1"]').innerText = `Total : ${t.toFixed(2)}$ - Followers : ${followers}`;
    }
}
function twitchCounting(){
    let lif1 = document.querySelector('label[for="tf1"]');
    let bif1p = document.querySelector('button.plus[target="tf1"]');
    let bif1m = document.querySelector('button.minus[target="tf1"]');
    bif1p.onclick = ()=>{
        ctf1+=1;
        lif1.innerText = ctf1;
        if(bif1m.hasAttribute('disabled') && ctf1>0) bif1m.removeAttribute('disabled');
        itotal()
    }
    bif1m.onclick = () => {
        if(ctf1 == 0) return;
        ctf1-=1;
        lif1.innerText = ctf1;
        if(ctf1 <=0) bif1m.setAttribute('disabled','');
        itotal()
    }
    let lif2 = document.querySelector('label[for="tf2"]');
    let bif2p = document.querySelector('button.plus[target="tf2"]');
    let bif2m = document.querySelector('button.minus[target="tf2"]');
    bif2p.onclick = ()=>{
        ctf2+=1;
        lif2.innerText = ctf2;
        if(bif2m.hasAttribute('disabled') && ctf2>0) bif2m.removeAttribute('disabled');
        itotal()
    }
    bif2m.onclick = () => {
        if(ctf2 == 0) return;
        ctf2-=1;
        lif2.innerText = ctf2;
        if(ctf2 <=0) bif2m.setAttribute('disabled','');
        itotal()
    }
    let lif3 = document.querySelector('label[for="tf3"]');
    let bif3p = document.querySelector('button.plus[target="tf3"]');
    let bif3m = document.querySelector('button.minus[target="tf3"]');
    bif3p.onclick = ()=>{
        ctf3+=1;
        lif3.innerText = ctf3;
        if(bif3m.hasAttribute('disabled') && ctf3>0) bif3m.removeAttribute('disabled');
        itotal()
    }
    bif3m.onclick = () => {
        if(ctf3 == 0) return;
        ctf3-=1;
        lif3.innerText = ctf3;
        if(ctf3 <=0) bif3m.setAttribute('disabled','');
        itotal()
    }
    function itotal()
    {
        let t = (ctf1*1.49)+(ctf2*7.29)+(ctf3*13.99);
        let followers = (ctf1*1000)+(ctf2*5000)+(ctf3*10000);
        if(t == 0 || followers == 0 && selectedItem == 2) ppr.setAttribute('disabled','');
        else if(selectedItem == 2) ppr.removeAttribute('disabled');
        document.querySelector('.offer .total[target="2"]').innerText = `Total : ${t.toFixed(2)}$ - Followers : ${followers}`;
    }
}
instagramCounting();
twitchCounting();
    atx = "";
    var proceed = document.getElementById('proceed');
    var action = 1;
    proceed.onclick=()=>{
        var total = selectedItem == 1 ? (cif1*1.49)+(cif2*7.29)+(cif3*13.99) : (ctf1*1.49)+(ctf2*7.29)+(ctf3*13.99)
        var followers = selectedItem == 1 ? (cif1*1000)+(cif2*5000)+(cif3*10000) : (ctf1*1000)+(ctf2*5000)+(ctf3*10000)
        
        total = total.toFixed(2);
        followers = Math.round(followers);
        
        if(total == 0 || followers == 0) return;
        
        proceed.setAttribute('disabled','');
        document.querySelector('.step .progress-bar .progress').classList.remove('p'+action);
        action++;
        document.querySelector('.step h1').innerText = `STEP ${action}`;
        document.querySelector('.step .progress-bar .progress').classList.add('p'+action);
        if(action == 2)
        {
            
            
            fetch('/views', {
                method:'get',
                headers:{
                    selected:selectedItem,
                    view:2
                }
            }).then((res) => res.text()).then((res)=>{
                document.querySelectorAll('.offer').forEach((o)=>{
                o.classList.add('hide');
                    setTimeout(()=>{

                    
                        o.remove();
                        
                        document.querySelectorAll('.offer-title').forEach((o)=>o.innerText = 'ENTER YOUR DETAILS')
                        document.getElementById('switcher').classList.remove('offers');
                        document.getElementById('switcher').classList.add('edetails');
                        setTimeout(()=>{
                            proceed.removeAttribute('disabled');
                        },80);
                    },150)
                });
                setTimeout(()=>{
                    proceed.classList.add('v2');
                    document.getElementById('switcher').innerHTML += res;
                    atx = document.querySelector('.field[index="2"] label').innerText;
                },160)
                setTimeout(()=>{
                    proceed = document.getElementById('proceed');
                    proceed.removeAttribute('disabled');
                    proceed.onclick = ()=>{
                        let i1 = document.querySelector('.field[index="1"] label');
                        let i2 = document.querySelector('.field[index="2"] label');
                        let i3 = document.querySelector('.field[index="3"] label');
                        let input1 = document.querySelector('.field[index="1"] input');
                        let input2 = document.querySelector('.field[index="2"] input');
                        let input3 = document.querySelector('.field[index="3"] input');
                        i1.style.color = '';
                        i1.innerText = 'Full Name';
                        i2.style.color = '';
                        i2.innerText = atx;
                        i3.style.color = '';
                        i3.innerText = 'Your Email';
                        let v1 = input1.value.trim();
                        let v2 = input2.value.trim();
                        let v3 = input3.value.trim();
                        if(v1 == '' || v2 == '' || v3 == '')
                        {
                            i1.innerText = 'Full Name - Pls fill all the inputs';
                            i2.innerText = atx+' - Pls fill all the inputs';
                            i3.innerText = 'Your Email - Pls fill all the inputs';
                            i1.style.color = '#F95151';
                            i2.style.color = '#F95151';
                            i3.style.color = '#F95151';
                        }else{
                            proceed.setAttribute('disabled','');
                            var p1 = selectedItem == 1 ? cif1 : ctf1;
                            var p2 = selectedItem == 1 ? cif2 : ctf2;
                            var p3 = selectedItem == 1 ? cif3 : ctf3;

                            fetch('/views',{
                                method:'get',
                                headers:{
                                    selected:selectedItem,
                                    view:3,
                                    full_name:v1,
                                    url:v2,
                                    email:v3,
                                }
                            }).then(res => res.text()).then(res => {
                                document.querySelectorAll('.edetails *').forEach((e)=>
                                {
                                    e.classList.add('hide')
                                    setTimeout(()=>{
                                        e.remove();
                                    },150)
                                });
                                document.querySelectorAll('.offer-title').forEach((o)=>o.innerText = 'ACCEPT THE TRANSACTION')
                                document.querySelector('.step h1').innerText = 'STEP 3';
                                document.querySelector('.step .progress.p2').classList.remove('p2');
                                document.querySelector('.step .progress').classList.add('p3');
                                document.querySelector('.edetails').innerHTML = res;
                                document.querySelector('.edetails').classList.add('b');

                                let pay = document.getElementById('pay');
                                pay.onclick = () => {
                                    if(p1 == 0 && p2 == 0 && p3 == 0) return window.location.reload();
                                    let form = document.createElement('form');
                                    form.method = 'post';
                                    form.action = '/api/submit';
                                    form.innerHTML = `<input name="full_name" value="${v1}">
                                    <input name="url" value="${v2}">
                                    <input name="email" value="${v3}">
                                    <input name="p1" value="${p1}">
                                    <input name="p2" value="${p2}">
                                    <input name="p3" value="${p3}">
                                    <input name="selected" value="${selectedItem}">
                                    `
                                    form.style.display = 'none';
                                    document.body.appendChild(form);
                                    form.submit();
                                }

                            })
                        }
                    }
                },300)
            })
            
        }
    }
    if(document.querySelector('.offers .offer'))
    {
        initCheckers();
        function initCheckers(){
        document.querySelectorAll('.offers .offer .check').forEach((check)=>{
            check.onclick = () => {
                if(check.classList.contains('checked')) return;
                document.querySelectorAll('.offers .offer .check.checked').forEach((elem)=>elem.classList.remove('checked'));
                check.classList.add('checked');
                if(selectedItem == 1)
                    {
                        selectedItem = 2;
                        let t = (ctf1*1.49)+(ctf2*7.29)+(ctf3*13.99);
        let followers = (ctf1*1000)+(ctf2*5000)+(ctf3*10000);
        if(t == 0 || followers == 0 && selectedItem == 2) ppr.setAttribute('disabled','');
        else if(selectedItem == 2) ppr.removeAttribute('disabled');
                    }
                else 
                {
                    selectedItem = 1
                    let t = (cif1*1.49)+(cif2*7.29)+(cif3*13.99);
        let followers = (cif1*1000)+(cif2*5000)+(cif3*10000);
        if(t == 0 || followers == 0 && selectedItem == 1) ppr.setAttribute('disabled','');
        else if(selectedItem == 1) ppr.removeAttribute('disabled');
                };
                initCheckers();
            }
        })
    }
    }
}