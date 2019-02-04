(function(){
    
    const $app = document.querySelector('#app');

    function addIssueInfoCardToHtml (el) {

        $app.innerHTML = 
        `<div class="issueInfoCard" id="${el.id}">
                <p>Issue ID: ${el.id}</p>
                <span class="status ${el.status}">${el.status.charAt(0).toUpperCase() + el.status.slice(1)}</span>
                <h3 class="description">${el.desc}</h3>
                <div class="info">
                    <span class="priority ${el.prior.toLowerCase()}"><i class="fas fa-exclamation-circle"></i>${el.prior}</span><span class="user"><i class="fas fa-user-circle"></i>${el.user}</span>
                </div>
                <div class="manage">
                    <span class="solve">Close</span><span class="delete">Delete</span>
                </div>
        </div>` + $app.innerHTML;
    }

    function addIssueFromFormOnSubmit(e) {

        e.preventDefault();

        const issue = {
            id: 'ISS'+ new Date().getTime(),
            status: 'open',
            desc: document.querySelector('#description').value,
            prior: document.querySelector('select[id="priority"]').value,
            user: document.querySelector('#assigned-user').value,

        };

        localStorage.setItem(issue.id, JSON.stringify(issue));
        addIssueInfoCardToHtml(issue);
        issueEventListeners(); 

    }

    function addIssuesFromStorage () {
        function getAllKeysFromStorage() {

            let values = [],
                keys = Object.keys(localStorage),
                i = keys.length;
        
            while ( i-- ) {
                if (/^ISS[0-9]+$/.test(keys[i])) {
                    values.unshift( JSON.parse(localStorage.getItem(keys[i])) );
                } 
            }
            
            return values;
        }

        let allFromStorage = getAllKeysFromStorage();
        
        allFromStorage.forEach(function(el) {     
            addIssueInfoCardToHtml(el);
        })
    }

    function issueEventListeners() {
        let listedCards = document.querySelectorAll('.issueInfoCard');

        listedCards.forEach(function(el){
            
            const issueId = el.id;
            
            el.querySelector('.solve').addEventListener('click', function(){
                const status = el.querySelector('.status');
                status.classList.remove('open');
                status.classList.add('closed');
                status.textContent = 'Closed';

                const retrivedStorage = JSON.parse(localStorage.getItem(issueId));
                retrivedStorage.status = 'closed';
                localStorage.setItem(issueId, JSON.stringify(retrivedStorage));
            })

            el.querySelector('.delete').addEventListener('click', function(){
                localStorage.removeItem(issueId);
                el.style.display="none";
            })
        
        })
    }

    document.querySelector('#myForm').addEventListener('submit', addIssueFromFormOnSubmit);

    addIssuesFromStorage ()
    issueEventListeners();
    
}())