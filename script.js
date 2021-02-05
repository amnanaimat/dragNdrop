const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');


draggables.forEach(draggable=>{
    draggable.addEventListener('dragstart',()=>{
        draggable.classList.add('dragging');
    })
    draggable.addEventListener('dragend',()=>{
        draggable.classList.remove('dragging');
    })
})

containers.forEach(container=>{
    container.addEventListener('dragover',e=>{
        e.preventDefault();
         
        const  elementAfter = getDragAfterElement(container, e.clientY);
        const dragging = document.querySelector('.dragging');
        if(elementAfter == null){
        container.appendChild(dragging);
        } else {
                container.insertBefore(dragging,elementAfter);
          
            
        }
    })
})
function getDragAfterElement(container,posY){
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
    return draggableElements.reduce((closet,child)=>{
        const box = child.getBoundingClientRect();
        const offset = posY - box.top - box.height/2;
        if(offset < 0 && offset> closet.offset){
            return {offset:offset,element:child}
        } else {
            return closet;
        }
    },{offset: Number.NEGATIVE_INFINITY}).element;
}