"""Add park_code column to ParkAmenity, UserPark, Review models.

Revision ID: 4f089e236c7f
Revises: 60547350efcf
Create Date: 2023-07-19 18:59:28.471331

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4f089e236c7f'
down_revision = '60547350efcf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('park_amenities', schema=None) as batch_op:
        batch_op.add_column(sa.Column('park_code', sa.String(), nullable=True))
        batch_op.drop_index('ix_park_amenities_amenity_id')
        batch_op.create_index(batch_op.f('ix_park_amenities_amenity_id'), ['amenity_id'], unique=False)

    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.add_column(sa.Column('park_code', sa.String(), nullable=True))

    with op.batch_alter_table('user_parks', schema=None) as batch_op:
        batch_op.add_column(sa.Column('park_code', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_parks', schema=None) as batch_op:
        batch_op.drop_column('park_code')

    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.drop_column('park_code')

    with op.batch_alter_table('park_amenities', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_park_amenities_amenity_id'))
        batch_op.create_index('ix_park_amenities_amenity_id', ['amenity_id'], unique=False)
        batch_op.drop_column('park_code')

    # ### end Alembic commands ###
