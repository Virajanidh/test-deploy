Per default the data of the MariaDB service is stored within a docker named volume (seb-server-mariadb) and can either be directly dumped 
from there by using a script or it is also possible to map this named volume to the hosts files system on installation process to 
apply to host file-system backup procedures that may already be in place for your particular IT environment. In this way you can perform
a physical backup of the database data.

Another method would be to connect to the MariaDB server from a script on the host within the exposed port and perform a logical backup.

We recommend to contact your system administration to develop and apply a proper backup and restore procedure that fits best with your
IT infrastructure. For further information about backup and restore procedures for MariaDB see 
`Backing Up and Restoring Databases <https://mariadb.com/kb/en/backing-up-and-restoring-databases/>`_


There is also a docker-based backup and restore service provided by `loomchild <https://github.com/loomchild/volume-backup>`_ directly
read and write to the named volume. This can be used to manually make a backup from the current docker volume or it may also be 
possible to automate this procedure for automated backups on daily basis.

.. note:: 
   We highly recommend to stop the service before providing a physical backup like this with docker-compose down. And starting the
   service again after backup has been done with docker-compose up -d.

.. code-block:: bash

    # Create a backup
    $ docker run --rm -v seb-server-mariadb:/volume -v $PWD:/backup loomchild/volume-backup backup seb-server-backup-[DATE]
    
    # Restore from a previously created backup
    $ docker run --rm -v seb-server-mariadb:/volume -v $PWD:/backup loomchild/volume-backup restore seb-server-backup-[DATE]
    $ docker restart seb-server-mariadb