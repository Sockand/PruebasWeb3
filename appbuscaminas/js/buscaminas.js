
			var mine = inicializaMatriz();
			var mostradas = 0;

			function inicializaMatriz(){
				var tabla = [];
				for(var i = 0; i < 8; i++){
			        tabla[i] = [0,0,0,0,0,0,0,0];
			    }
			    return tabla;
			}

			function crearTablero(){
				for(var i = 0; i < 8; i++){
			        for(var j = 0; j < 8; j++){
			           var div = document.createElement("div");
			            div.id = i + "" + j;
			            div.addEventListener("click",mostrarNumero, true);
			            tablerominas.appendChild(div);
			        }
			    }

			}

			function mostrarNumero(e){
				var auxstr = this.id.split("");
				var myid = auxstr[0] + auxstr[1];
				divObj = document.getElementById(myid);

				if(mine[parseInt(auxstr[0],10)][parseInt(auxstr[1],10)] == 0){
					divObj.style.backgroundColor = "white";
					abrirAlrededor(parseInt(auxstr[0],10),parseInt(auxstr[1],10),mine);
				}else{
					/* If the clicked position is not 0 and not bomb then this happens. */
					if(mine[parseInt(auxstr[0],10)][parseInt(auxstr[1],10)] != "*" && mine[parseInt(auxstr[0],10)][parseInt(auxstr[1],10)] != "9"){
						document.getElementById(myid).innerHTML = "<p style='margin-top:15px;'>" + mine[parseInt(auxstr[0],10)][parseInt(auxstr[1],10)] + "</p>";

						var valor_punto = mine[parseInt(auxstr[0],10)][parseInt(auxstr[1],10)];
						console.log(valor_punto); // imprime 2
						if(valor_punto == 1){divObj.style.backgroundColor = "yellow";}
			           	else if(valor_punto == 2){divObj.style.backgroundColor = "orange";}
			           	else if(valor_punto > 2){divObj.style.backgroundColor = "red";}
						/* If the clicked position is not 0 and has bomb then this happens. */
					}else{
						divObj.style.backgroundImage = "url(img/bomba.jpg)";
						abrirTablero(mine);
						alert("Perdiste Jijiji");
						restartGame();
					}
				}
				mostradas++;
				checkDiscovered();
			}

			/* Calculates the number of the around bombs for each position. It takes in account the borders. */
			function bombasAlrededor(tablero){
				for(var i = 0; i < 8; i++){
			        for(var j = 0; j < 8; j++){
			           if(tablero[i][j] == "*" || tablero[i][j] == "9"){
			           		if(i == 0 && j == 0){
			           			increaseBombNumber(i, j, i + 1, j + 1,tablero);
			           		}
			           		else if (i == 0 && (j > 0 && j < 7)) {
			           			increaseBombNumber(i, j - 1, i + 1, j + 1,tablero);
			           		}
			           		else if(i == 0 && j == 7){
			           			increaseBombNumber(i, j - 1, i + 1, j,tablero);
			           		}
			           		else if(j == 7 && (i > 0 && i < 7)){
			           			increaseBombNumber(i - 1, j - 1, i + 1, j,tablero);
			           		}
			           		else if(i == 7 && j == 7){
			           			increaseBombNumber(i - 1, j - 1, i, j,tablero);
			           		}
			           		else if(i == 7 && (j > 0 && j < 7)){
			           			increaseBombNumber(i - 1, j - 1, i, j + 1,tablero);
			           		}
			           		else if(i == 7 && j == 0){
			           			increaseBombNumber(i - 1, j, i, j + 1,tablero);
			           		}
			           		else if(j == 0 && (i > 0 && i < 7)){
			           			increaseBombNumber(i - 1, j, i + 1, j + 1,tablero);
			           		}else{
			           			increaseBombNumber(i - 1, j - 1, i + 1, j + 1,tablero);
			           		}
			           }
			        }
			    }
			}

			function increaseBombNumber(vari,varj,fini,finj,tablero){
				for(var i = vari; i <= fini; i++){
			        for(var j = varj; j <= finj; j++){
			           if(tablero[i][j] != "*" && tablero[i][j] != "9"){
			           		tablero[i][j] = (parseInt(tablero[i][j])+1);
			           }
			        }
			    }
			}

			/* Generate 8 bombs randomly, if it repeats position then search again. */
			function generarBombas(tablero){
				var fil = 0;
				var col = 0;

				fil = Math.floor((Math.random()*7)+0);
				col = Math.floor((Math.random()*7)+0);

				for(var i = 0; i < 8; i++){
					while (tablero[fil][col] == "*"){
						fil = Math.floor((Math.random()*7)+0);
						col = Math.floor((Math.random()*7)+0);
					}
					tablero[fil][col] = "*";
				}
				for(var i = 0; i < 3; i++){
					while (tablero[fil][col] == "9" || tablero[fil][col] == "*"){
						fil = Math.floor((Math.random()*7)+0);
						col = Math.floor((Math.random()*7)+0);
					}
					tablero[fil][col] = "9";
				}
			}

/* Check if all no bombs has been discovered */
			function checkDiscovered(){
				for(var i = 0; i <= 7; i++){
			        for(var j = 0; j <= 7; j++){
			        	var myid = i+""+j;
			        	var objDiv =  document.getElementById(myid)
			           if(objDiv.textContent != ""){
							mostradas++;
			           } else if(objDiv.style.backgroundColor == "green"){
			           					mostradas++;
			           				}
			       }
			   }
			   		mostradas--;
			   		console.log("Mostradas" + mostradas); // Print showed slots
			          if(mostradas>(8*8-8-1)){
							alert("Has ganado :)");
							restartGame();
						} else {
							mostradas=0;
						}

			}
			/* Once we have determined the surrounding area to be opened then we check every position */
			function abrirCeros(vari,varj,fini,finj,cori,corj,tablero){
				for(var i = vari; i <= fini; i++){
			        for(var j = varj; j <= finj; j++){
			        	var myid = i+""+j;
			        	var objDiv =  document.getElementById(myid)

					/* Check if the position has been showed. Content as a flag */
			           if(objDiv.textContent == ""){
			           		if(tablero[i][j] == 0){
			           			if(i == cori && j == corj){
			           				objDiv.textContent = ""	;
			           				objDiv.style.backgroundColor = "green";
			           				/* Check if the position has been showed. Uses backgroundColor as flag, just to not show bombs, which are img and doesnt have any background color. */
			           			}else{
			           				if(objDiv.style.backgroundColor != "green"){
			           					abrirAlrededor(i, j,tablero);
			           				}
			           			}

							/* Adds numbered position. Check there is not bomb. */
			           		}else{
			           			if(tablero[i][j] != "*" && tablero[i][j] != "9"){
			           				document.getElementById(myid).innerHTML = "<p style='margin-top:15px;'>" + tablero[i][j] + "</p>";
			           				if(tablero[i][j] == 1){objDiv.style.backgroundColor = "yellow";
			           					}
			           				else if(tablero[i][j] == 2){objDiv.style.backgroundColor = "orange";}
			           				else if(tablero[i][j] > 2){objDiv.style.backgroundColor = "red";}
			           			}
			           		}
			           }


			        }
			    }
			}

			function abrirAlrededor(xi,xj,tablero){
				if(xi == 0 && xj == 0){
					abrirCeros(xi, xj, xi + 1, xj + 1, xi, xj,tablero);
				}
				else if(xi == 0 && (xj > 0 && xj < 7)){
					abrirCeros(xi, xj - 1, xi + 1, xj + 1, xi, xj,tablero);
				}
				else if(xi == 0 && xj == 7){
					abrirCeros(xi, xj - 1, xi + 1, xj, xi, xj,tablero);
				}
				else if(xj == 7 && (xi > 0 && xi < 7)){
					abrirCeros(xi - 1, xj - 1, xi + 1, xj, xi, xj,tablero);
				}
				else if(xi == 7 && xj == 7){
					abrirCeros(xi - 1, xj - 1, xi, xj, xi, xj,tablero);
				}
				else if(xi == 7 && (xj > 0 && xj < 7)){
					abrirCeros(xi - 1, xj - 1, xi, xj + 1, xi, xj,tablero);
				}
				else if(xi == 7 && xj == 0){
					abrirCeros(xi - 1, xj, xi, xj + 1, xi, xj,tablero);
				}
				else if(xj == 0 && (xi > 0 && xi < 7)){
					abrirCeros(xi - 1, xj, xi + 1, xj + 1, xi, xj,tablero);
				}else{
					abrirCeros(xi - 1, xj - 1, xi + 1, xj + 1, xi, xj,tablero);
				}
			}

			/* Show all bomb positions. */
			function abrirTablero(tablero){
				for(var i = 0; i < 8; i++){
			        for(var j = 0; j < 8; j++){
			        	var myid = i+""+j;
			        	var objDiv =  document.getElementById(myid);
			           if(tablero[i][j] == "*"){
			           		objDiv.style.backgroundImage = "url(img/bomba.jpg)";
			           }
			           if(tablero[i][j] == "9"){
			           		objDiv.style.backgroundImage = "url(img/false_bomba.jpg)";
			           }
			        }
			    }
			}

			function restartGame(){
				var myNode = document.getElementById("tablerominas");
				while (myNode.firstChild) {
    			myNode.removeChild(myNode.firstChild);
				}
				mine = inicializaMatriz();
				mostradas=0;
				cargarTablero();
			}

			function cargarTablero(){
			console.log(1); // imprime 2
			crearTablero();
			generarBombas(mine);
			bombasAlrededor(mine);
			console.log(2); // imprime 2
		}

