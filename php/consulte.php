<?php
	function consulte($sql, $bada) {
		$conn = new mysqli("localhost", "root", "bandband", $bada);
		if ($conn->connect_error) {
     		die("Connection failed: " . $conn->connect_error);
		}
		$result = $conn->query($sql);
		if ($result->num_rows > 0) {						
			while($row=mysqli_fetch_array($result)) {			
				for ($j=0; $j<$numcolumnas; $j++ ) {
					if ($j==0) {
						echo $row[$j];
					} else {
						echo utf8_decode("|" . $row[$j]);
					}			
				}	
				if ($k<$numfilas) { echo ";"; }		
			}		
		} else {
			echo 'nada';
		}
	}
?>