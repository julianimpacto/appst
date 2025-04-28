<?php
    $q = $_REQUEST["q"];
    $partes = explode(";", $q);
	$p = new COM("ClassLibrary1.ComClass1");
	$p->Sume($partes[0], $partes[1]);
    echo $p;

    ?>
