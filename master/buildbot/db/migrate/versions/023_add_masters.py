# This file is part of Buildbot.  Buildbot is free software: you can
# redistribute it and/or modify it under the terms of the GNU General Public
# License as published by the Free Software Foundation, version 2.
#
# This program is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
# FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more
# details.
#
# You should have received a copy of the GNU General Public License along with
# this program; if not, write to the Free Software Foundation, Inc., 51
# Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
#
# Copyright Buildbot Team Members

import sqlalchemy as sa

def upgrade(migrate_engine):

    metadata = sa.MetaData()
    metadata.bind = migrate_engine

    # existing objects table, used as a foreign key
    objects = sa.Table("objects", metadata,
        # unique ID for this object
        sa.Column("id", sa.Integer, primary_key=True),
        # object's user-given name
        sa.Column('name', sa.String(128), nullable=False),
        # object's class name, basically representing a "type" for the state
        sa.Column('class_name', sa.String(128), nullable=False),

        # prohibit multiple id's for the same object
        sa.UniqueConstraint('name', 'class_name', name='object_identity'),
    )

    # add masters table
    masters_table = sa.Table('masters', metadata,
                             sa.Column('id', sa.Integer, primary_key=True),
                             sa.Column('buildbotURL', sa.Text, nullable=False),
                             sa.Column('objectid', sa.Integer, sa.ForeignKey('objects.id'), index=True, nullable=False),
                             sa.UniqueConstraint('objectid', name='masters_objectid'),
                             )

    # create the initial schema
    masters_table.create()