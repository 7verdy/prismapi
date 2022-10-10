const selectRequest = document.querySelector('[name="request"]');
const addEquipment = document.querySelector('.addEquipment');
const getEquipment = document.querySelector('.getEquipment');

const requests = [ addEquipment, getEquipment ];
selectRequest.addEventListener('change', (e) => {
    if (e.target.value === 'addEquipment') {
        addEquipment.classList.toggle('hidden');
        if (!getEquipment.classList.contains('hidden')) {
            getEquipment.classList.add('hidden');
        }

    } else if (e.target.value === 'getEquipment') {
        getEquipment.classList.toggle('hidden');
        if (!addEquipment.classList.contains('hidden')) {
            addEquipment.classList.add('hidden');
        }
    }
});