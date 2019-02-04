const validation = {
	formReady: document.querySelector('#myForm'),
    formDesc: document.querySelector('#description'),
    select: document.querySelector('select[id="priority"]'),
	formPerson: document.querySelector('#assigned-user'),
    formDescValid: false,
    formSelectValid: false,
    formPersonValid: false,
    
	checkName: function() {
		this.formDesc.addEventListener('change', function() { 
			const errorClass = 'validation-error';
			const okClass = 'validation-ok';
			const rule = new RegExp('^[a-zA-Z ]{3,300}$', 'g'); 
			    if (!rule.test(this.value)) {
			        this.classList.remove(okClass);
			        this.classList.add(errorClass);
			        return validation.formDescValid = false;
			    } else {
			        this.classList.remove(errorClass);
			        this.classList.add(okClass);
			        return validation.formDescValid = true;
			    }		
		})
    },

    checkSelect: function() {
        this.select.addEventListener('change', function() {

            if (this.value === 'default') {
                return validation.formSelectValid = false;
            }
            else {
                return validation.formSelectValid = true;
            }
        });
    },
    
    checkPerson: function() {
		this.formPerson.addEventListener('change', function() {
			const errorClass = 'validation-error';
			const okClass = 'validation-ok';
			const rule = new RegExp('^[a-zA-Z1-9]{3,15}$', 'g');
			    if (!rule.test(this.value)) {
			        this.classList.remove(okClass);
			        this.classList.add(errorClass);
			        return validation.formPersonValid = false;
			    } else {
			        this.classList.remove(errorClass);
			        this.classList.add(okClass);
			        return validation.formPersonValid = true;
			    }		
		})
	},

	checkAll: function() {
        this.checkName();
        this.checkSelect();
        this.checkPerson();
		this.formReady.addEventListener('change', function() {
			if (validation.formDescValid && validation.formPersonValid && validation.formSelectValid) {
				sendButton.disabled = false;
			}
			else {
				sendButton.disabled = true;
			}
		})
	}
}

const sendButton = document.querySelector('#submit');
sendButton.disabled = true;

validation.checkAll();



