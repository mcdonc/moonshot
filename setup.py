from setuptools import setup

requires = [
    'pyramid', 'waitress', 'PyJWT', 'requests', 'requests-oauthlib'
]

setup(name='moonshot',
      install_requires=requires,
      entry_points="""\
      [paste.app_factory]
      main = moonshot:main
      """
    )
