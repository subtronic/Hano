		tower = $(function(){
			return {
				num : 1,
				n : 0,
				sizeOfBlocks : function(){
		            n = n < 3 ? 4 : n;
		            var start=10,
		            	end=30,
		            	width=[],
		            	part=(end-start)/n,
		            	j=0,
		            	height=parseInt(500/n);
		            
		            for (var i=part;i<=end-start;i += part){
		                width[j]=parseInt(start+i);
		                j++;
		            }
		            //alter
		            var pt=parseInt((100-10)/n),
		            	wth=[];
		            j=0;
		            for (var z=10;z<=100;z += pt){
		                wth[j]=parseInt(z);
		                j++;
		            }
		            console.log(width);
		            console.log(height);
		            console.log(wth);
				},
				init : function(){
					var n=($('#NumberOfBlocks').attr('value')>0)?$('#NumberOfBlocks').attr('value'):4,
						width=40,
						height=150/n;

					$('.takeit').html('');
					//$("#block1").html('');
					//$("#block2").html('');
					//$("#block3").html('');
					for (var i = 1; i <= n; i++) {
						$('#block1').append('<div align="center" id="'+i+ '" class="textBlock" number="'+i+'" lst="1">'+i+'</div>');
						$('#'+i).css('width',(width-(n-2*i*i))+'%').css('height',height+'px');
					}

					$('#block1').children().first().draggable({
		        		revert:'invalid'
		    		}).draggable('enable');
				},
				save : function(){
					$('#block3').children().draggable( 'disable' );
							$.post("save.php",
							{tofile: $('#res').html()},function(data){
							$('#dialog-intro').html('Вы победили за '+(num-1)+' иттераций! <a href="logs/'+data+'"> Здесь хранится запись ваших шагов </a>');
							$('#dialog').dialog();
					});
				},
				pp : function(){
		    		$('.takeit').children().draggable('disable');
		            //$('#block1').children().draggable( 'disable' );
					//$('#block2').children().draggable( 'disable' );
					//$('#block3').children().draggable( 'disable' );
					//$('#block1').children().first().draggable({
		       	 	//helper:'clone'
					//	revert:'invalid'
		  			// }).draggable( 'enable' );
				    $('.takeit').children().first().draggable({revert:'invalid'}).draggable('enable');
					/*$('#block2').children().first().draggable({
		      		 	 //helper:'clone'
						revert:"invalid"
		    		}).draggable( 'enable' );
					$('#block3').children().first().draggable({
		       	 	//helper:'clone'
						revert:"invalid"
		   			}).draggable( 'enable' );
					*/
					$('#block1').children().first().draggable( 'enable' );

		    		$('div.wrapper').children().droppable({
		    		    hoverClass: 'dropHere',//accept:function(el){return el.hasClass("someClass")} 
						drop: function(event, ui) {
							if(!$(this).is('.textBlock')){
								if ($(this).children().first().attr('number')>ui.draggable.attr('number') || $(this).children().is('.textBlock')!=true) {
									if($(this).attr('lst')!=ui.draggable.attr('lst')){
										$('#res').append(' \r\n №'+num/*ui.draggable.attr('number')*/+' '+ui.draggable.attr('lst')+' -&gt; '+$(this).attr('lst'));
									}
									ui.draggable.attr('lst',$(this).attr('lst'));
									$(this).prepend($('<div id="'+ui.draggable.attr('id')+ '" class="textBlock" number="'+ui.draggable.attr('number')+'" lst="'+ui.draggable.attr('lst')+'" style="width:'+ui.draggable.css('width')+';height:'+ui.draggable.	css('	height')+'">' + ui.draggable.html() + '</div>'));
									num++;
									ui.draggable.remove();
									pp();
								} else {
									$('#block'+ui.draggable.attr('lst')).prepend($('<div id="'+ui.draggable.attr('id')+ '" class="textBlock" number="'+ui.draggable.attr('number')+'" lst="'+ui.draggable.attr('lst')+'" style="width:'+ui.draggable.css('	width')+	';height:'+ui.draggable.css('height')+';">' + ui.draggable.html() + '</div>'));
									ui.draggable.remove();
									pp();
								}
							}
							if ($('#block3').children().length == n){
								save();
							}
					   }
		    		});
				}
			}
		});
		