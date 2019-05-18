#!/usr/bin/perl
#Ce script sert à lancer la mesure de débit en tant que administrateur (les droits 777)
		#Définition des bibliothèques utilisées 
	#-----------------------------------------------------------------------------------------	
use strict;
use warnings;
use IO::Socket::INET;
#-----------------------------------------------------------------------------------------	
		#Rester toujour à l'écoute des requetes entrantes
	#-----------------------------------------------------------------------------------------	
while (1)
{
function();
}
sub function {
my $socket;
my  $clientsocket;
my $serverdata;
my $clientdata;

#-----------------------------------------------------------------------------------------	
		#Définition de la socket de l'écoute
	#-----------------------------------------------------------------------------------------	

$socket = new IO::Socket::INET (
    LocalHost => '127.0.0.1',
    LocalPort => '0168',
    Proto => 'tcp',
    Listen => 1,
    Reuse => 1
) or die "Oops: $! \n";
print "Waiting for the Client.\n";

#-----------------------------------------------------------------------------------------	
		#Acceptation des requetes entrantes
	#-----------------------------------------------------------------------------------------


$clientsocket = $socket->accept();

print   "Connected from : ", $clientsocket->peerhost();     # Display messages
print   ", Port : ", $clientsocket->peerport(), "\n";

my $Options = <$clientsocket>;
print $Options;

#-----------------------------------------------------------------------------------------	
		#Lancement de la commande et mettre les résultats dans un fichier tomporaire
	#-----------------------------------------------------------------------------------------

system("$Options > /opt/lampp/htdocs/Stage2/resultats/tmp2");
print $clientsocket "done";
shutdown($clientsocket, 1);


$socket->close(); 

}
#-----------------------------------------------------------------------------------------	
		#Fermeture de la communication
	#-----------------------------------------------------------------------------------------


