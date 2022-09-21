<?php
$customers = [
    1 = > [
    'name' = > 'Alice',
    'orders' = > [
    '49.99',
    '75.32',
    ],
    ],
    2 = > [
    'name' = > 'Bob',
    'orders' = > [
    '209.28',
    '22.92',
    ],
    ],
    ];


function newArray ($cusomers){
$newArray = []
for($i=0; $i<count($customers);$i++){  
      if($cusomers[$i].orders > 200 )
       {  
            push_array($newArray, $customers[$i].name)
            }             
} 
return $newArray
} 
echo newArray($customers)


?>
