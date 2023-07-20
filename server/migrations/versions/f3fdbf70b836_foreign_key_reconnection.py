"""Foreign key reconnection.

Revision ID: f3fdbf70b836
Revises: 4f089e236c7f
Create Date: 2023-07-20 15:07:51.068018

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f3fdbf70b836'
down_revision = '4f089e236c7f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('park_amenities', schema=None) as batch_op:
        batch_op.drop_index('ix_park_amenities_amenity_id')
        batch_op.create_index(batch_op.f('ix_park_amenities_amenity_id'), ['amenity_id'], unique=False)

    with op.batch_alter_table('parks', schema=None) as batch_op:
        batch_op.alter_column('code',
               existing_type=sa.VARCHAR(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('parks', schema=None) as batch_op:
        batch_op.alter_column('code',
               existing_type=sa.VARCHAR(),
               nullable=False)

    with op.batch_alter_table('park_amenities', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_park_amenities_amenity_id'))
        batch_op.create_index('ix_park_amenities_amenity_id', ['amenity_id'], unique=False)

    # ### end Alembic commands ###