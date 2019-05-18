#!/usr/bin/perl
#Ce script sert à lancer les captures tshark en tant que administrateur (les droits 777)
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
    LocalPort => '0158',
    Proto => 'tcp',
    Listen => 1,
    Reuse => 1
) or die "Oops: $! \n";
print "Waiting for the Client.\n";
#-----------------------------------------------------------------------------------------	
		#Acceptation des requetes entrantes
	#-----------------------------------------------------------------------------------------
$clientsocket = $socket->accept();

$serverdata = "PID pere $$:)\n";
print $clientsocket "$serverdata \n";

my $Options = <$clientsocket>;
print $Options;


#-----------------------------------------------------------------------------------------	
		#Récupération de la date et l'heure actuelle afin d'identifier le fichier résultat
	#-----------------------------------------------------------------------------------------
my $datestring = localtime();
$datestring =~ tr/ //ds;
my $file = "capture" . $datestring ;
print $datestring;
#-----------------------------------------------------------------------------------------	
		#Lancement de la capture
	#-----------------------------------------------------------------------------------------
system("tshark $Options -w /opt/lampp/htdocs/Stage2/resultats/$file");
#-----------------------------------------------------------------------------------------	
		#Fermeture de la socket
	#-----------------------------------------------------------------------------------------
$socket->close(); 
#-----------------------------------------------------------------------------------------	
		#Changement des droit d'administration du fichier trace créee
	#-----------------------------------------------------------------------------------------
system("chmod 777 /opt/lampp/htdocs/Stage2/resultats/$file");
#-----------------------------------------------------------------------------------------	
		#Sauvegarde du nom de la trace générée dans un fichier tomporaire
	#-----------------------------------------------------------------------------------------
system("echo $file > /opt/lampp/htdocs/Stage2/resultats/file.txt");
sleep 1;
#-----------------------------------------------------------------------------------------	
		#Copie de la trace vers le bureau.
	#-----------------------------------------------------------------------------------------
system("cp /opt/lampp/htdocs/Stage2/resultats/$file /home/cec/Desktop/NetProTester/Captures");

}


