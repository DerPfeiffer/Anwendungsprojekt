# Anwendungsprojekt
Repository für das Modul Anwendungsprojekt im 6. Semester an der FOM Hochschule fuer Oekonomie und Management

# backend
Das Backend bildet den Teil der Business-Logik ab und ist in Java implementiert. Die zugrundeliegende Technologie ist Spring. Für die Entwicklung wird eine gültige Java-Version (11 oder höher), sowie eine gültige Maven-Installation (Version 3.8.6 oder höher) benötigt.
Für einen Start der Sourcen ist im Hauptverzeichnis der Befehl "mvn spring-boot:run" auszuführen. Builds werden über den Befehl "mvn clean install" durchgeführt und im target Ordner abgelegt.

# Frontend
Das Frontend bildet die Ansicht der Applikation im Web und ist mit Typescript implementiert. Das zugrundeliegende Framework ist Angular. Für die Entwicklung gelten die gleichen Systemvoraussetzungen wie für den Betrieb.
Für einen Start der Sourcen ist im Hauptverzeichnis der Befehl "ng serve" auszuführen.


# Installation
## Systemvoraussetzungen
### Backend
- Gültige Java Version (Version 11 oder höher)
### Frontend
- Gültige npm Installation (6.14.11 oder höher)
- Gültige Node.js Installation (14.16.0 oder höher)
- Gültige Angular CLI Installation (13.3.7 oder höher)

## Starten der Applikationen
Für die Backend-Applikation muss das Fat-Jar über den Befehl "java -jar Backend-<version>.jar" gestartet werden. Danach steht dieses bereit.
Für die Frontend-Applikation muss in das Hauptverzeichnis der Anwendung navigiert werden. Dort muss dann der Befehl "ng serve" ausgeführt werden.

# Konfiguration
## backend
### Entwicklung
Die Konfiguration des Backends erfolgt in der Entwicklung über die Datei /src/main/resources/application.properties. Die Parameter werden von Spring bereitgestellt. Die hinterlegte Konfiguration wird als Basis-Konfiguration ausgeliefert.
### Produktion
Um die Parameter in der Produktion zu ändern, muss vor dem Start des Servers die Parameterdatei geändert werden. Dazu muss die jar-Datei geöffnet werden und die Werte in der Datei /BOOT-INF/classes/application.properties angepasst werden. 

## frontend
### Entwicklung
Das Frontend nutzt die gängigen Angular-Parameter. Ein zusätzlicher Parameter wird durch eine Angular-Konstante abgebildet. Diese ist unter src/app/app.module.ts mit dem Namen HTTP_BASE_URL abgelegt und muss auf den Backend-Server, samt Port, verweisen. 
### Produktion
Das Vorgehen für die Produktion richtet sich nach dem Entwicklungsvorgehen.
