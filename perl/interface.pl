#!/usr/bin/perl -w
#Ce script sert à récupérer les différents interfaces
		#Définition des bibliothèques utilisées 
	#-----------------------------------------------------------------------------------------	
use strict;
use warnings;
use 5.012;
use CGI;
use URI::Escape;
#use Capture::Tiny ':all';
use Carp; 
my $cgi = new CGI;
use utf8;  
use CGI::Carp qw(fatalsToBrowser); 

#-----------------------------------------------------------------------------------------	
		#Lancement de la commande
	#-----------------------------------------------------------------------------------------	
my $value = qx(ifconfig -s);
#-----------------------------------------------------------------------------------------	
		#Envois des résultats
	#-----------------------------------------------------------------------------------------	
print $value;

$cgi->header('text/plain;charset=UTF-8');



