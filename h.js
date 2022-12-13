var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');

form.addEventListener('submit', addItem);

itemList.addEventListener('click', removeItem);
itemList.addEventListener('click', editItem);


function addItem(e){
  e.preventDefault();

  var newItem = document.getElementById('item').value;
  var newItem1= document.getElementById('item2').value;
  var select = document.getElementById('select1');
var text = select.options[select.selectedIndex].text;

  var li = document.createElement('li');
  
  li.className = 'list-group-item';
  
  li.appendChild(document.createTextNode(newItem+" "+newItem1+" "+text));
  
  var deleteBtn = document.createElement('button');

  deleteBtn.className = 'btn delete';

  deleteBtn.appendChild(document.createTextNode('DELETE'));
  var editbtn = document.createElement('button');
editbtn.className= 'edit';
  

  editbtn.appendChild(document.createTextNode('EDIT'));
 
  li.appendChild(deleteBtn);

  itemList.appendChild(li);
  li.appendChild(editbtn)

  
}


function removeItem(e){
  if(e.target.classList.contains('delete')){
    if(confirm('Are You Sure?')){
      var li = e.target.parentElement;
      itemList.removeChild(li);
    }
  }
}
function editItem(e){
  if(e.target.classList.contains('edit')){
    if(confirm('Are You Sure?')){
      var li = e.target.parentElement;
      var op = addItem();
      itemList.replaceChild(op);
    }
  }

}

