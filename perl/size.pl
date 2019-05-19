#!/usr/bin/perl -w
	#Ce script sert à récupérer la taille d'un fichier afin de l'utiliser pour calculer le débit
		#Définition des bibliothèques utilisées 
	#-----------------------------------------------------------------------------------------	
use strict;
use warnings;
use 5.012;
use CGI;
use URI::Escape;
use Carp; 
my $cgi = new CGI;
use utf8; 
use CGI::Carp qw(fatalsToBrowser); 
use IO::Socket::INET;
#-----------------------------------------------------------------------------------------	
		#Récupération du nom de fichier
	#-----------------------------------------------------------------------------------------	
my $param = $cgi->{param};
my $file = $cgi->param('file');
my $size;

#-----------------------------------------------------------------------------------------	
		#Récupération de la taille du fichier 
	#-----------------------------------------------------------------------------------------	
$size = qx(du -b /opt/lampp/htdocs/Qostrouble/Dl/$file);
#-----------------------------------------------------------------------------------------	
		#Envois du résultat
	#-----------------------------------------------------------------------------------------	
print $size;



$cgi->header('text/plain;charset=UTF-8');


