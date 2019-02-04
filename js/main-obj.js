let newIssue = document.createElement('div');
const app = document.querySelector('#app');
let listedCards = document.querySelectorAll('.issueInfoCard');

function Issue(issueDesc, issuePrior, issueUser) {

    this.issueId = 'ISS'+ new Date().getTime();
    this.issueStatus = 'open';
    this.issueDesc = document.querySelector('#description').value;
    this.issuePrior = document.querySelector('select[id="priority"]').value;
    this.issueUser = document.querySelector('#assigned-user').value;

}
   
Issue.prototype.addIssueInfoCard = function(id, status, desc, prior, user) {
    app.innerHTML = 
        `<div class="issueInfoCard" id="${id}">
                <p>Issue ID: ${id}</p>
                <span class="status ${status}">${status.charAt(0).toUpperCase() + status.slice(1)}</span>
                <h3 class="description">${desc}</h3>
                <div class="info">
                    <span class="priority ${prior.toLowerCase()}"><i class="fas fa-exclamation-circle"></i>${prior}</span><span class="user"><i class="fas fa-user-circle"></i>${user}</span>
                </div>
                <div class="manage">
                    <span class="solve">Close</span><span class="delete">Delete</span>
                </div>
        </div>` + app.innerHTML;
}

Issue.prototype.issueFunc = function() {

    listedCards.forEach(function(el){
        el.addEventListener('mouseenter', function(e) {
            const issueId = el.id;
            
            el.querySelector('.solve').addEventListener('click', function(){
                const status = el.querySelector('.status');
                status.classList.remove('open');
                status.classList.add('closed');
                status.textContent = 'Closed';

                const retrivedStorage = JSON.parse(localStorage.getItem(issueId));
                retrivedStorage.issueStatus = 'closed';
                localStorage.setItem(issueId, JSON.stringify(retrivedStorage));
            })

            el.querySelector('.delete').addEventListener('click', function(){
                localStorage.removeItem(issueId);
                el.style.display="none";
            })
        })
    })
    
}

Issue.prototype.getAllFromStorage = function() {
    
    let values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.unshift( JSON.parse(localStorage.getItem(keys[i])) );
    }

    return values;
}  

Issue.prototype.allFromStorage = Issue.prototype.getAllFromStorage();

Issue.prototype.addToPresentation = function() {
    this.allFromStorage.forEach((el) => {
        this.addIssueInfoCard(el.issueId, el.issueStatus, el.issueDesc, el.issuePrior, el.issueUser);
    })    
}


document.querySelector('#myForm').addEventListener('submit', function(e) {

    e.preventDefault();

    const issue = new Issue (document.querySelector('#description').value, document.querySelector('select[id="priority"]').value, document.querySelector('#assigned-user').value)

    localStorage.setItem(issue.issueId, JSON.stringify(issue)); // add to local storage

    issue.addIssueInfoCard(issue.issueId, issue.issueStatus, issue.issueDesc, issue.issuePrior, issue.issueUser); // add to html

    listedCards = document.querySelectorAll('.issueInfoCard'); // updated array to allow function
    issue.issueFunc(); // call the function on updated array

})

/* Init main functions */
const issue = new Issue();
issue.addToPresentation();
listedCards = document.querySelectorAll('.issueInfoCard');
issue.issueFunc();