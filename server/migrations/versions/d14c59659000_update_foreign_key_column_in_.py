"""Update foreign key column in ParkAmenity, UserPark, and Review.

Revision ID: d14c59659000
Revises: fb609302ddf2
Create Date: 2023-07-12 22:08:17.559670

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd14c59659000'
down_revision = 'fb609302ddf2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('park_amenities', schema=None) as batch_op:
        batch_op.drop_index('ix_park_amenities_amenity_id')
        batch_op.create_index(batch_op.f('ix_park_amenities_amenity_id'), ['amenity_id'], unique=False)
        batch_op.drop_constraint('fk_park_amenities_park_id_parks', type_='foreignkey')
        batch_op.create_foreign_key(batch_op.f('fk_park_amenities_park_code_parks'), 'parks', ['park_code'], ['code'])

    with op.batch_alter_table('parks', schema=None) as batch_op:
        batch_op.alter_column('id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('code',
               existing_type=sa.VARCHAR(),
               nullable=False)

    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.drop_constraint('fk_reviews_park_id_parks', type_='foreignkey')
        batch_op.create_foreign_key(batch_op.f('fk_reviews_park_code_parks'), 'parks', ['park_code'], ['code'])

    with op.batch_alter_table('user_parks', schema=None) as batch_op:
        batch_op.drop_constraint('fk_user_parks_park_id_parks', type_='foreignkey')
        batch_op.create_foreign_key(batch_op.f('fk_user_parks_park_code_parks'), 'parks', ['park_code'], ['code'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_parks', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_user_parks_park_code_parks'), type_='foreignkey')
        batch_op.create_foreign_key('fk_user_parks_park_id_parks', 'parks', ['park_id'], ['id'])

    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_reviews_park_code_parks'), type_='foreignkey')
        batch_op.create_foreign_key('fk_reviews_park_id_parks', 'parks', ['park_id'], ['id'])

    with op.batch_alter_table('parks', schema=None) as batch_op:
        batch_op.alter_column('code',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('id',
               existing_type=sa.INTEGER(),
               nullable=False)

    with op.batch_alter_table('park_amenities', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_park_amenities_park_code_parks'), type_='foreignkey')
        batch_op.create_foreign_key('fk_park_amenities_park_id_parks', 'parks', ['park_id'], ['id'])
        batch_op.drop_index(batch_op.f('ix_park_amenities_amenity_id'))
        batch_op.create_index('ix_park_amenities_amenity_id', ['amenity_id'], unique=False)

    # ### end Alembic commands ###