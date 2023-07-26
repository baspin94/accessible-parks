"""Change primary key in parks to 'code' and update foreign key in related tables.

Revision ID: aad4194fd9b0
Revises: f3fdbf70b836
Create Date: 2023-07-20 15:38:47.529195

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'aad4194fd9b0'
down_revision = 'f3fdbf70b836'
branch_labels = None
depends_on = None

def upgrade():
    # Add temporary columns for park_code values.
    op.add_column('park_amenities', sa.Column('temp_code', sa.String))
    op.add_column('user_parks', sa.Column('temp_code', sa.String))
    op.add_column('reviews', sa.Column('temp_code', sa.String))

    # Copy 'park_code' values to 'temp_code' columns.
    op.execute('UPDATE park_amenities SET temp_code = park_code')
    op.execute('UPDATE user_parks SET temp_code = park_code')
    op.execute('UPDATE reviews SET temp_code = park_code')

    # Drop foreign key constraints
    op.execute('ALTER TABLE park_amenities DROP CONSTRAINT fk_park_amenities_park_id_parks')
    op.execute('ALTER TABLE user_parks DROP CONSTRAINT fk_user_parks_park_id_parks')
    op.execute('ALTER TABLE reviews DROP CONSTRAINT fk_reviews_park_id_parks')

    # Drop the old primary key
    op.execute('ALTER TABLE parks DROP CONSTRAINT parks_pkey')
    
    # Add the new primary key
    op.execute('ALTER TABLE parks ADD PRIMARY KEY (code)')
    
    # Add back the foreign key constraints, linking to the new primary key
    op.execute('ALTER TABLE park_amenities ADD CONSTRAINT park_amenities_code_fkey FOREIGN KEY (park_code) REFERENCES parks (code)')
    op.execute('ALTER TABLE user_parks ADD CONSTRAINT user_parks_code_fkey FOREIGN KEY (park_code) REFERENCES parks (code)')
    op.execute('ALTER TABLE reviews ADD CONSTRAINT reviews_code_fkey FOREIGN KEY (park_code) REFERENCES parks (code)')

    # Copy 'park_code' values to 'temp_code' columns.
    op.execute('UPDATE park_amenities SET park_code = temp_code')
    op.execute('UPDATE user_parks SET park_code = temp_code')
    op.execute('UPDATE reviews SET park_code = temp_code')

    # Drop temporary columns
    op.drop_column('park_amenities', 'temp_code')
    op.drop_column('user_parks', 'temp_code')
    op.drop_column('reviews', 'temp_code')

def downgrade():
    # Drop foreign key constraints
    op.execute('ALTER TABLE park_amenities DROP CONSTRAINT park_amenities_code_fkey')
    op.execute('ALTER TABLE user_parks DROP CONSTRAINT user_parks_code_fkey')
    op.execute('ALTER TABLE reviews DROP CONSTRAINT reviews_code_fkey')
    
    # Drop the new primary key
    op.execute('ALTER TABLE parks DROP CONSTRAINT parks_pkey')

    # Add back the old primary key
    op.execute('ALTER TABLE parks ADD PRIMARY KEY (id)')
    
    # Add back the foreign key constraints, linking to the old primary key
    op.execute('ALTER TABLE park_amenities ADD CONSTRAINT fk_park_amenities_park_id_parks FOREIGN KEY (park_id) REFERENCES parks (id)')
    op.execute('ALTER TABLE user_parks ADD CONSTRAINT fk_user_parks_park_id_parks FOREIGN KEY (park_id) REFERENCES parks (id)')
    op.execute('ALTER TABLE reviews ADD CONSTRAINT fk_reviews_park_id_parks FOREIGN KEY (park_id) REFERENCES parks (id)')

