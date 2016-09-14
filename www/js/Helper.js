var Helper = {

  testLogo: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUTExMVFhUXFx4bFxgYGBgeHRkaGiAYGBgaGhsdHSggGxolGx8bIjEhJSkrLi4uGB8zODMsNygtLisBCgoKDg0OGxAQGy0mICYvLTUyMi0tLS0vLy0vLS0tLS0tLS0tLS0tLS8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAABAMFAgYHAQj/xABJEAABAwIEAgYGBQoDBwUAAAABAAIRAyEEEjFBBVEGEyJhcYEHMpGhscEjQlLR8BQkM2JzgpLS4fE0U3IVFhclQ7LCRIOToqP/xAAbAQACAwEBAQAAAAAAAAAAAAAABAIDBQEGB//EADsRAAICAQIEAgcGBgEEAwAAAAABAgMRBCEFEjFBE1EiYXGBkaGxBhQyM8HwFSNCUtHhJFNykvE0Q2L/2gAMAwEAAhEDEQA/AO4oAEACABAAgAQAIAEACABAAgAQAIAEACABAAgAQAIAEACABAAgAQAIAEACABAAgAQAIAgx2LZRpvqvIDGNLnE7AXJXJPCyBpeJ9KuBbUNNjatUhmaaYY4RpE5tVUrljLTXtLqaJ3Nxgt8DWI9IuGY2m51OsOs0GVsi2a/a5LlGojdNwj2LnorFjONyD/ifg/8ALrfwt/mTnhMl9ws80eO9KGEm1Ouf3WfN6iq5Mi9DZ6hjF+kXC06XWup1o7NsrZGYgAEZuZSkdTGU+VHbdDZXU7ZYwviR/wDEvCf5db+Fv8yt50YH8Tq8mOYHpzhqtMVGsqwZ1DZsY+0qZ6qEZYaY94qxkWx/pHwlJ7WOZXJdplpkgXi5BgKddyn0LYYks5HcB00oVanVtZVByl1wIhpaDvr2gu6y1aWKlPv5EoVubwixPHKfJ3sH3rO/jNHk/l/kt+7SK7iXTXD0Hhj21JLcwgNiJj7Wqao11d0XKKZdRoLLpOMWjXa/pkwLSQaOJ1InIyDFrdtNc6FZ1uEnF9iw4T6T8HiGucxlYZdZa3f95M0USuzy9hDVayvTY587+Q5/v7hvsVf4W/zJj+H2eaEv41R5P9+8jr+kLDMaXGnWgfqt/mXJaCyKy2idfF6ZyUUn8P8AYuz0m4QgHq61yR6rdo/W70jb/LnyPrjI/O+MaFe+jePXkyHpLwkOOSt2RJ7LeYH2u9QVi5lHzeCFOqhbzcufRTfuRkfSRhB9St/C3+ZaH3CzzQp/FqfJ/v3jOF6dUHz9FXEfaaB/5LM1Woq06Tck/Zua+lqs1DfouP8A3bCGM9JuHpPLXYfFQCBnFNuW8CZzaXUa9VXNZTLnpLFLlx7+x7/xPwf+XX/hb/Mp+NEc/hF3mvn/AIJML6SsJUo1qwp1stEkOlrZMAEx2r6qizW112xqaeZCf3We/qeC76M9I6WOY99Nr2hr8pD8skwHWgm10zCamtiOo006JKM+5cqZQCABAAgAQBTdMmg4HFAiQaL5B8Cux3ZbQk7Ip+aPn3DVaNKoxvVAOqGMzQBAJAP3+So11bwnHtk9DVZVp7VFQ3ltkexmBL6jXCsYaIiCQfIm1rJCi91LKW45qdB4tisTxjsKDhlcz9O3/wCMfem/4hJdhZ8Ov/6ny/2SU+D4kkDr2id+r/qoy4o0s4KpaG5f/Yvh/sfd0dqPY1r8RVdl9YA2dDi4Eg6kW9gWb9+jGTaignonZBQsm8fUgqcJxdyH0SJMSHzF4m+sJla+D2aZhv7LRzsxqljsXhadOkzDtrANu4OIEkkqClVZJuUsDFvCJxwoLO24N6UYzT8ibe05/wASuuur+8jXwy9ST5BTD8KqNL3U69ZrnNILsx7IJDjEEHbSUT1HPhTWUvM3J8LripOL3fy9gvUweNaSPy+v5PqfzqUZ0tZ8NfIWXCZtZU/l/sKdOvTLnOqVMS8gABzjIuSYLnFThOHRLlQxptLZpVKa9JvG3QxOIrn/ANK4/vtKs54f3E3qLu9PzQ9Qwb6lMHNUoG5IYRPKDGqgtdOptVvYp1PD6ddCMrYYaz5DDOjtQi2MxEnYOR/F9Rnr8xF/Z7SJ9PkjCh0ce6WvxFdzXAggm19x7Fyzitzj1+bLI8B0db5lj4Ih4jwl9BrGUGGpBcXZnCRmiL25KqjV88nKxlPEOEeNRGqronnt5HnCcPUqF7K9M02OYRna9s5gQWx7NVO+9JJ1vdMU4fwCymxufRrApiejzgDlrVi6DALt9rq6PEbO7+bNOf2e0/K3Hr22RY0+kOLaADhAYAH6USfcs96OqTb5/kWRhqkseH8wrcRq4lj6VSiaII9cPDoIIPLVdhRCmSnGWSaqutThOPL68ldS4CGOa44h5AdJBBggbapn7w2msE6eHyUk3Y3jsQ46g6k1+XFHqn1O1SDS1pDiJkzGndsrKPDsuh4kVt3YjxPR201ztjLr2Oh+inEdlwa6QavOfqtWzqYVQa8Lpjsed0119sW72215+R1lLDAIAEACABAFT0tH5liP2TvgVOv8SLaPzI+1HzjxBn5xh/8AX82rmuWI+5mxNp6mr2l49pCxU8nqlJM9p/j+64wl0LAPIHnZLtJsWlFMusPiGwGm5GttvnZZ1lMm20Izg+pjiWt0EZT6pbrPJ17LtPNnfr6/0JQb79fX+gnWpnIG7A6e/wDBTia5um5fFrmyIii4HTUx4bK3KZc2n0MH1De4HO2i6kVYfRmLqVgde8bXP91YSj+IhqMj2rqeS6PUlw9Bx015fjRRnJIjOaGaODfOt4/AuqpWwwQdkcFoAQBe0QPDxS3ibi2U2z2i94IMkjYa6qUrE1g7JRawYVmh14g+2fLmhTS2OxbjsYdS0Egl2sG0Gdo71xzbWYkudtZRjjMHABEie6Zi9/JFV+W8hXbliFbDBpG5I/smI2ZTL1PmTPWYZzokwOXPzXHYl0KJzXY9q0MxyyAuqfKsnIy5dyue3JiKTZDg8PJEDYCNVs8HxZduux5r7V6ia0aS23Nv9HDMtWuLf4g6f6KZWhqUlPYwdC26Vk6wlxwEACABAAgCp6Wf4LEfsnfAqcPxIto/Mj7UfOePbGIw8/b+bVzXfh9zNmSxqavabEaM/wB1gqR6NTx0McXUexheynncPqzE/f4KVfK5YkxbWWWwqbqWWYcL4/SxJDXQx4+q46nuOh8NUW6WUN47oz9LxGFnoy2fyLzCs7cGdb+CQt/DlD1j9HKI+L4XrWOotqGkTfMNwDMGCDfSx3UtNY6n4jWRW/Tu6vGf3/gq+G4kU6r6QnsAtcO2RYtyGXEmfWTupjzQUn3FdCv5jh5f5H8Q9z8rS2w7rnzS0PR3NyCUcvJGaGupH4hT5zvMRPpZDaDIE7KallHU87klJhNu9RbS3IyeNyww+Ey+O6VncmLzs5hipTMSPndUxmubDIRazhir8TDYMRNv6phQ9LKLVDL2JMLXkXOmnxVdkMPZdSNkd9jHE1mkGLRvzPcpQi49SUItPcco0ZaO0J12M7e0/JKTniT2F5T9LoRY3iEnLDgQdDvA1EXVlGn5fSJ1UtLmeDAYZpgn608+Uq7ncVg65vouwtXqNYAYnnspwjKbwyUYOTEqxqHM4A5DvbU7T4q5cixF9SxKOUn1Fa9sRh5BnJUJnXRsLZ4Jve8dDyX2tf8Ax/UbX6OCTVrkjWvbv7FP5rQ1T/mteRj6GLWnhJ91/o6wlxsEACABAAgCq6VVA3B4hxMAUnEnlbvUZdGMaVxV0HLplHz3hMlfFPMz1UODg8kEmPq6AeCS1E5Rgk3nPmbunjVdq5NdI7rD2Nnw+FLhcCD7YWY5pGtOai9hes7q8xsMoJN9hqrYLnaXmcutVdMpvsjWqXCWYguc7O10AyABJIzkxyOYATeydt1DraSPPVaFXZcn++ptfC3BrQ0EgtbEuMzpedysq18zybkIpQUV0RIzGlgfI9UEknW1481bCCk0l3O6hKFbmuyNf6JV3VG1ajjJfUPgN7DxcmNds4xRkcNzKEpvq2bO9nLlzWf23NlPYUxlTI0nWCJ7kxpqndYovYp1Wp8CvxGsiLuKBwkCezO/Z2jTx9icWglHuZi42l/Q/iZs41RYQS3N4ONjpcR+JXLOGWNYU18CMuNJraLLscZplxaTTbDQ4S9wmZMA5LkRHJZa4bPZ5fXy/wBkFxBdosT/AN4m9oZbAbn4W/Ep6XA5ReVPPuYuuNLKzW/ihatxynIhrTmg2cbmYj1LFW/wmcVvP6jMeM9uX5mWPxAtFh3CyUqg98no6oeYuyrJDY3seWislHCyWNYyy7a+QSZDRcSVntYeF1EuXD9Zh+WsDiGjXf8AupeBNrMifhSayyY4puUQDO5teOW6g65OT32KvDllkLg14ILfH5K30ovZkt49GQM7Iy2LdTJ/GqnL0t+5N7vPckwnAKePazEU8RUplj3sBa1vMNPrDuKnDXW6GeElnCMDiCr1a5H0X1GPRDVc5jy4lzuudJO8Bo2XoVNzbk+rMlwjCEYRWEl+rOxKRAEACABAAgCp6Wf4LEfsnfArkuhTqfypexnBOD4upUxT6RcMjWS0ECx7O4EnU6lZerjGMObG7Zr/AGaul4ai+mP1NspDKINo0OsrKby8npZek8oqek0Ci/KRmIAzGMoJIHhFxPmm9E5Snv6xTXWSjp2/WvqIcDrNLS4Oc7NUccx1N/hOnkrdXFuePIOHxUqsro2yyrEzlEeI19qpikllmnFRS5is6SYioyg8tAv2XE6gGx8ybJnSqLn9DI4pZJU+j07iPR7HUqGHYHHtPc4gbQ06knQW7yrLqHba23ssGfp9UqK4rGW8ss6OMxLqkltNtIOuQS5zotY237hoq7K6ox5V1NLTS1V0+d4UPqW9anmkGIME7d/tSddkq2px6oauohfXyTPMVSDWtyl7ZApkT9UGYttfZXQ1+ok2pNPbyFa+F6fLyvmPO4EyRN7RqbC5GiSfGLnvndeoV+46Z/0/NjuK4PSd6wcSWhs5nSQBA3SMeIX9cr4I7XVGKajsn6yvxfCaLZytdcQ7tG/d3rR03E9Uk0pLf1AtBVa8zKt+CptMNzRaRJMxcJ/7/qLViTz7iyHCtLBZS+Y46o0BzXAeG/NIyhNSTNOD52nFiDZL5JAIFhzt3eKv6RwhltKOEemvdu2x+aFDZgo7MlwpFyfCYnnp7/YoziyFj3SPaLHF0TobkDW8FclJKOTsmksmwCg4DsnxkfjdZjsjJ+kZzmn1KzFUyCDYfAcvmnK3HGBiEl0HPRofzIftqt/33Knib/5Huj9Dz9fR+1/UsuhPR/8AIXGkKnWBzy+csRMCNTyXotDqfHrcsd8fIRvi4tL99TpSdKAQAIAEACAKjpf/AILE/sna+BXJdDqp8d+FnHNt8T5/wBbRxHWVHfpYpgNafWJbG+lves/URdkMLsbeh0kOGtKUs52WxuFa0tjTT7r63KyEt9zbjvuUHSTEFlEugGHNsdLEWPMWT+jinPHqE+JT5KE15oruBu+haYicxtoLnTuU7lmxlnCk3THPrLNlUm5VfKuxquONhTphifzbLrmeIO8CTCnoofzG/Ueb4thRSXmSUqH/AC5oFndWDIAnK4gu9oKpU398fk8/TYo8P/jJ+wY4TTFRjWtBDc9Tw9d/481zUS5Jyz6vojQ0Ev5Ofb9S1qHskRtpsl4rc0ILBPgmzlLpgearteM4I2bN4EeNdIKlMltEN7A+kq1J6th1DQAZe82sOaY03D65Rzbu329XmzE1Orkm4w6ef6IrOF9OHiq1tcDtAdoMc3KTqCCTLZ+tZWajhdTh/K7FVOsfMoW9H3xg2fE4yQTF592yzq6MNLJswq3RrHSk1OrkPyHNBGuYuhoGsRedFr6JpZSWwnxKv0Y4fq9uSGhQZSAbAbbciT3wTPM+anNWT3wPaezTUYrjJJjeHdne0Ex4fjVUuPKtjRniEWxTEY8ZooMdXMxIc0DNv3kd8Ad6YVSjHNrwYs+KWWPl08M+v9/qRYTFVauJyVGBhp03EAHNcw2SQeVlGyMK6vR6NlGkvst1Wbf6U+n7ZfYKs6Rc3F+6PmkbIxwbk1FotX43KwFjibXa6+to1SSp5pvmXwE/Cbk+ZELK2ckHXNYCYHx7le4ciTRLw1HDRUuwn5PWo06dWs1j3PLmiq4CSC4wARHautDRr7y3zxXwPO8WgtNT4kG1l/U3jonTh/rOdLtXOc46DdxK1q6o1rEVgxdNdO2Lc3k6IpjAIAEACABAFP0wcBgcSSQAKL5J8CuS6Mv0rSug35o+d+Ki+HI3qtIPmISv9MvYbuva5q2v7kbfiHO9WYv7FjxxnJsxS6lP0ppA4V/MEH3prSPFhncVWdO/ahPgOX8mZa8m895Urs+KzvCcuuK9paUmTbQFVybRqSz2KHpi4xTpzPaJHlAHxTekxyuR5ri7zZGKNjFL82qsH1aBHsaY+CzIPF8ZebGr4Y07XqEuidfLhGEC+Z895zH5K7VQ5tQ0/Uc4XvWk/WN1sfl9ZzGnk5wB95U1ppPsaE9XpoPDmjPD8Tc6Lgt5ju71B6aKe/Usk6nU7YvKwazwdrsRNWo90CqOrbPZzOcHOJ/i9/cnr7FD0F5P6HmdLVzrxZdmvqWXSDCdZTdLQXNBIO9t5+SU0ksSWO5q62iNlDn5FnwXGZ6LM2pY3zsFRdDFjx5jelblVF+pfQouPZ8RWFOmYFOC9/J31QO8D4rQp5aa8vuZ2ornrb/DhtGHV+vuVXEOEgNlpJqEmS46iCSSrarXLdi2t0NdUYqvd75LarUdlbSaYfU7M7hoHbcO/bzKqhhZs8jU1lkrFXpYvd9fYixoxTAZSaGwNvj4pV+lvLcdVca48kFsiq4O/wDOMTVJtMExOlz8B7U1qIc0Y1nn9LJRlbc+n+xzF8QxLw7qWvDm6sY1paAYIL3EXJE6HU20kx8PT1rE8e/qQlfqLHmLeV5dP9j3BuIGrTYTaRDhyIJDh3H5EJS6pQkze0lyvpVj6/qX1DDtpwQ6ZERr3zKUk3OO52U3PZoosfUjFUcx0c432lq2OGdTz/2mj/xI48zfeiTpcHAggu27oC05v0mvI85oYtVZfdnRFEdBAAgAQAIAqulVNzsHiGsEuNJwAty77e1V2tKDb8iyr8a9pwnjHCi6qxrSwGlVa9zcwkMkEWHdos6Goi68+aPRXV+PKCra9F5Zf1KQNyNT/b5pBNroaik10FON4cPoPY0Q5wNtdrSraJONikym+p21yi31RrPQysHB1Im4u0dx19/xTesTTU0ZnCL8ZgzZqdO2nnGiSct+pvN7mq8TpdbxAMmWtiOUAZvefitJPk0/uPL2p261p9n9C64jxSnQpuDiXPe0gMbrEESTs37ilaNO5tTfRMc1mqhXB14y38ii4Bgq1SkAar2UZJysMF0ayRtM27k1fdGuWy3EtFpPGS55NRLPEcAwwovIGUhs5jeNDMk6pWGpslao+ZoX6bTVVS5Y9upVdHcaXVKoDcrXMJyjQOEC3KZTd8UuV+sQ0d8pOyPZpvC6ZHuigmi0Xs4z3aH7ktq9rBzhiTpS9ZbcTdFN5OmR0+EFV6eOZo0dU4x002/I8wjm0sOC+CGUmk87NFvbZQUXO7HrFfEdFHN5RXxwI08I+kxpfZ9Ttu8XXjysPJXTtVknjsNcPr5KFHu937xbFV/p6bBplJd4SP5Y/eV8Fy1NiWpXPro1rolv9TzrW/lkbClA8SQT5wotNUIhVLGvlzdUtvkOY/GihRc62Ynsd7iLezU+CjRW5Sy+iGeI3qmrCe8v22VdCgWYVrQSH1HsJO/aLffAV/Pmxy8kZzo5dNXD+5r9/A2jBU3AuLTaWiJ0gAW8oWXe1LGf3uaMa/5kljbP6FTw2tkr4iiD2G1C4AN+1rJ2FhA7+5OWxTrjJ4zhCfD21qZw7Zfs95tVGt9GGgbG2kfesucPTyaso+lkosRiGMrUjVYKrA49YzI19ixwHZP60exaVMXKL5dhTimZVxUVnf5G/wDQ7G4etldhqYp0w4gtDAztA9rsjdPaSMoxal1yeZu2kdFTRUCABAAgAQAnxjN1FXKAXZDAJIExuQDAVOoWapJ+TJQlyyTOJYmm5mPque5gqPpsljCTAFg6SBY8lkKK8BRXTLPQ8McbJynlZa6ewmfWLPEn4KHJk2+VSPHPkOzSDtb8QFzG6wGMNYNK45hX4Wu2q3RxzDx+s0+PzWlRONsOVnm9dXLTajxq+jfz7ono8cxTx9FRaNe1DiGgayScotzUvAqTwzkuIayyLkunngy4DQc7NXqGXPNieWpPmfgqdVNbQQzw2hpO6XV/vPvL9vCmy+uJLnUst4gAi8WsUqr2uWD7MYv0sK+ex9WsfIr+hjc1ADcPcPgbqWueLPcLcMadWH5mzFre014hoB5QQBcnaEnFSljw+pozlGMHJ9O5qfACx9erVY0CmYYwQAMoidNJt7Vp6p8sYx8jK0VfO53YwuiF+GY4YOu6lUGUBxIdfeMsjlG6lZV94gpRe5Cm5aS11T6f56FhxjGMxZFLDXYXDrHm0NHayibkWmfAbqFFctPByse5O3UPVyjTDpnczxzm1KjKbQ/IHNNQZCGEAZh9JF+1FgYXK3y1ttrPzL7YTu1Chh8qe/lhDuKp5+0BvAHd/dLVvDwbdLSbb6GvYOq12IrPLmgQKbZIvzDRuTlm3NaF0HyJJdDz2l1FctTZbN9XhDXEeC5iHtcWPAFxuNj3aqirU8qx2H9ZoI24sTxIp+I4CsXs6ypnmRJPqgXdrYCE3XapLZYMTUaWVc1zyz/gfdDaTHZgWtqNMgk9nMQLnYAqlPM5L1GhtGiufZSXwbNgoNcAeTrn3T5Sk3v1NqKUkU3DKQ/K8SC6RIvHiQPl5JnUflxMXRZV9rW+/wCrNorB02i0XEe9I4WNzZjy8uGazB/KK08mfBadX5aMy5pamePV9DffRfTyhzZJHWkiYtmAJ96aq7sxNdWoWLHff5nWVaJAgAQAIAEAK8U/Q1P9JVV/5cvYDOH8ZbPFnd2GbMeJWVF/8de1mzwdtWv2GVV4cbCVWenUWjxjYdpMjRce6CTyuotiqDKrXNc2WnY6gjvU4ycGmmUaimNseSe5WYTgbWy2XlpglhcYPKQNVdLVSZlLQUwe+X7XsOlt7aKmO+5sU1/Afr4g0aDiGZiSM2pyjd0DWASVGuKnYsi2vlLlyunx27mrdHOLUaFN4e++ckZQTIgCRt7YT2o00rZppmFo9ZXRFp5Y5i+JVcaxzKNNzKf1qjiNN2gDmY0OyjCuvTvOcsv5r9diEVyx8x/h2EYwBjbBu86nWfNK2zlJ5NmEFVFVQ6I94twlmI7TwQW6OBuRrG4je/NFV0qtolOr0dV6TfX1EXDeHsotPVgguEFxMlw5ckW2ysfpdiOn01dG0Vv59ywaMrQ0TsTPfcKrHM8jqi3kXxuHqkZWvbTZHacBLzOoE2aO8XV1VkILOMyEr6L7HyqeId8dWe4GhRoNysZJ5m5vrr8oVds7LHu9gjpK68Ktf5K7H8RrVHvp4eWlgAnsEXuZLrhoHIFOQhXXWnZ3Eb7tTdZKNWyTx/7I6gmq4T2abcro0L3XcPACBCk3yQSXUYprWqulOX4YrHtfcZGB62k9gECIJ2EwB74Sys5JpsduqVlbr80QYbj9RtHIaRe6las6QMrfVEGLzy7kz93i5Zz16GPHX21Ll5d49c+fbA1wLh7soqOMVKtTORyB0B5a+9L6i1SnyrohvR1Oqtua3luy6xLYdbUkyPd5KjtualbzHcoeJYV7Kz6g6sNqZQ0OqEGWtgiMpk6pzT2JxUd8mNrM0yndNrl9b8l7Dd/Rlmh2YAHrNjOze4J+roYV2rr1LUq3nG3f9TrCtKQQAIAEACAEOPV208PWe6Q1rCTAJMAchcqu1Zg16jqTk8I4e/FirxF9WnmLDQDZc1ze1MkDMFkzhy0KL8za4XRONjc01sXIwQI3BOkRI7/BIStaZtu15M2cPh0i/fM7b+33KD1KlHchK7MdyWpgBEkCVXHUPmwimNmXsUWJrZSQ2IHn7Fo1x5llj8IKSyxOrVk3VyjhDEVhYMqeIPM+S44og45Z63CNMP6ljiCSTlF97qDnJPGRKemrU84XwJqrpbpHh8IXFkujGecLZHvC6QcS3S2q7btuWWR5FkssKxwkEDum86+5LykuqKptdiDFMAECJ7hp3KcHncsr3eTGo5sAutax8OfNdw+xJZzhA57XgAx/Zc3RGUGKuImBHeRurEtjqjyo14vq06tYCk4ue4FhNmi0Ak7+CfTrcYyb6Hnn94hOyuEfxPqWmFwgpMFO8n1idybk+ZSc7OeXMa+lojVBVxHMLhpBN9LCLGFGUsNDU3hi9TBtzh+RpcIkxfuUvEkljOxRZpq3PxHHfzLCnUDXG/hbfmqOVtJhGDe7Mm2v7yFJ7l3UpePPL3Utw2qDYaDKQdO/dN6RKLbMf7QaWdmjxXFt57e83j0aOmf2nyatKDT6HjNDpraIONsXF57nV1MeBAAgAQAIAV4q1po1A71S0g+BVGqbVM2vJllTammuuTi3TIdTxDCspSGOYSWAmHEZu9Y2kl4mnm57mtRqLZ6iKlLZl1hq4ee46EfD3LNui4xz5GtZBxQ7QxESDEzIge1K2wckmUThnDKnjPEAW2j1rd3NPaTTuL38hnT04e5qPEsWWNzakm3LzWzVDmeCWu1a0teYrLF+GY01C4O11BGm0hTtrUN0K8O4jO6TjZ+/UNZznDTYEtGaCRcgXjlOm8LqpTqc/bsd1fFJVWutRTW2+R0YprW1x1jZpiQ0tcBUES0gmwJ2CUcW3D0Xv3ythX+Lze/Is+8QxXFsok92jSQQYkgzqDstCWhUWt2UfxyzP4F8Rk8TbTMh8tBhrsrhLspdlINwdt0WaCKz6RNcdlPZwXxHMDxcOeRkDTlzTDjygCBEEnXZJanSeGk+bOX7AfFpOP4fmY/7WY6m2qxzHlxGdmVwcJmSDob2XKtJKV3hSTS89miM+L2Rr5owyJ1uL9YJEAFw7JnS3aiJG9vvWkuHRceZT+RSvtDbXJRdPbz+QnjuLZdIdaRBMHWRoq56FQlyqWRmr7QSlWpOvD8sjlE/RsqAtJcQMkuBE8uzD4OsSl40uVvhPb19vkWWceahnw8+8yw/EOtOUZcwP2rkGCTpoJie5Wz4eoVys51sL18Zd10KlW1n19CDjGNNLS7nbkaCyW09KkaOt1L0sFy9X9Bvo7xQ1WuBAlsTGkH8FR1NSg/aR0OsepzzdV8BvGmGgtGvuHiq47s1ISxnIoy6s6FnVFgzDFwBa64izvFLOzle62KnNR2kik43QdSrMaTqx5sdb0/6+1bvApQtsbx2PMfajUS8GDhJrftsbv6MpgyZ+k+QWpr4pTSSxsed0NkrINyk2898v6nV0iOggAQAIAEAVnSZ0YWsf1fmFVqPypex/QlHqjkPpDMcSwR/Ud8SsLQLOns9xpaX/wCTAcwlQMBIEQqba+fY9FYuZ4ZliMdmDS2ZmCJIBUK6eTKOQqw2mUeKHa7p0mU9DoOQ2Qti6TXACDrO3Ij5qyDaZVfp1at/3tgxoUA3uXZTyU1UeGM/kskODiCHNcIjVpkaiYkC3cjx5KDrfTf5i9ugqus55Z9xhV4bPWOzuPWGXkQLnbTs+ShG3GEl06EocPpjFwTe/wC/I8p4UDOesMuAmQ3bKANNLD3pr7/d5IWfA6G+r+X+AfDs2Y9p+phtgAGw2BYQieqsn1wT/gGn85fv3E2GoupnPTe4HKWmzTYi89nuVGo1D1CUbEtvccXB6Y7Jv5f4ExhQGtbJAbcCB77I5stywOLQRUVDLwvYQv4awzJNzMCPdbRNw19sYcixgz7OAaeVnO28ngwoGYAntAg6aG1rawo2aqdkuaWMko8B03KopywvX/oybhjAbmMDaG38bXVPidxpcPjhR5nt6l8zyhhQ0yCde6PK2ivesn4LqwsfMphwSmGoWp5nlduw7WpEiDBnfw+STjLyHrqVaZYLC5ZLRsBtzJ+a5ZPmwmV00Rq9/wDv/I3iMRPhFx3+CqhAtUOwuxu41VhclhYLBtYACDf4Jdxy9ynly9zXuN1C6tTJMwx/xYvQ8BilY8eR5b7V4VMEvM3r0Z+r++fgFpcQ/MXsPN8M/BL2/ojqyQNMEACABAAgCr6T082EriSJpm42XVWrHyPvsQss8OLnjONziOMxxq45raoL3U6Zc18wWyYIgDRIazRR0acIPZ4Nrg2vp12JKpRaz3z0Ha727ExyWakz08U+5PRjJp7N5+EKMvIrlnmFMThnRmt81KNizgthOPRiYHcrsl5PTpzdQlLGxVJklO/jooMrexniHFjS02zQbfA80Qak8oK/TefIUqTFvZv7FbHqXRWGYsoOF4m2oXXJEnJDtIHuHJVPBU8EWJw8DvPvhSjJ5CMssTAkd+kf1VmcE5YyAESCL/NGSD9R4G2QdXUM0ruCWOwzhyN1VNPsQmvIdfVy2bodfiqVHO8hdL+4wcQ6xgQNt/6qWHHoTjldBR7gCRNtlbvguW564xBNwUdehJR8hHGOaauXLMMkGTo43H/1F05pbrKVzweGzN1Gjo1tnh3xyks9fWbj6J8/VgvBBNR2oiwstSd3iqLby+54qOn8CyceXCzt8EddVZYCABAAgAQAhx//AA1b9m74K2j8yPtQvqvyJ+xnAiY4n40fmqOPrL+Ax9lPw/8Al+hevwoMkcjN9/6rzUbWlhnuY2tLDICC039yuzndE00+h5Uq7bbBdUe51RDrBHZESYnl4Fc5X3ZF5XVk1WtAAgW5EKuEN8pkYwb3I2PgRa/xU3HLBx3MqlXMwWlzdN7LkYcstujCMeV+ojogBskAnUnfyCnJtvCZa8vbJNSBecsgWttp3qEpKEeYi8QWSSjTkiIEQoSk4kZSwjPGYVtQgZhOwFxFpUqbG9sfEhVbyrKWUVLzlMAe1MdRyKyjGu2TmAAB2Gi6n2IY6bkcEXIK7syzC7GBB79VLKJYSGcB63l/ZVW9CqzoMVWGROn91BPbYok1gxfSdEgQuqSzgjXNZwxdtMzp3+xWZWBlSXmS1HS0tNrz7NIXFt0DHdFXiaZFbxpt+LlfB5h7xet51Mv+1fVm8eic/m1L/XU/73J2lelP2r6I8Zf+L4/U6ymCkEACABAAgBDj/wDhq37N3wVtH5kfahfV/kT9jOAYgf8AMv8A2fmVVxzr8C/7J7L/AMv0L2g+/hf7l5po9q2ZYsA9rfdcreNmWQeNhTq8w8Pxqr84Lk8GI2BnwG3JB1YSG62GAG4IiVBSeSEZtsUe3dt7TAmwVmV3LMruZ4ZwEx7OX9FyS8wnHPUsMM0SLAzpynkUtbJ46i8+g0zhwaASbQ4ESJm8HuSr1Tk8JeRT94zt7DnXSTiL2u6sEtcAQ6DbKbgdzjv7F6HT1xa5uqMvimqlzcq2fqfb/JXUMYaD8rXHI5rM4B+01pcQdnSTcK9w545a37CFd7pm0s8r6o3t9QVWtcQQIi47XKT46z3rMxyto9Xp5ehtn3kTqWX5ELucjC3IsZjuqbIAL3GBIBGUXcYPkPNa3B9FHUWtzWYo8/8AaDXT01cYVSxJ/REDOLAjtUwJ3bb3GVuW8A0094Nx+aMKj7Saut/zMTXwfyHaOIpntNdHIPEe+6yb/s7qIr0GpL4P9+81avtNp7PRti4/ND2HY5xEiYuC2DfyWLqdFfp0+eDXuNWOt0t0c1WJ+rO/wZ42s3QjK3m60xZKYfVbsuUH1W5DjHg9oer3c1bWmtn1GKYtbPqR1qOYTBAA18d/CfirE8FkZYeMkVAUhiMP+USaUPlgDyXW7JhlyJg7K2ptxlymRxabiotSx78ZOhdGn4bM1uFaWU2k9nI5sOJzGzhJmdU7pVLD5vP9DzNrTexvyaKwQAIAEACAKvpRUy4PEOEWpON/BW0/mR9pRqVmmWfJnA6GIFXGglgDjSsQTz0iY3VHGs5zny/Uc+y8YrKivP8AQ2N9AAmNjv8AevN5eD2KeVuY5r2QltuDRhiCMpi1/bKnBvudhLD9Igo05eJgT+OalOXoMslNcjwN4lxMzDTyVUPVuVwa7Fc5+oTPLkZeGeNd2rCwjfwQ0sA5ejgueH1O1vB1/skb4eiJ29CLHY4ucC0kA8/ep06dRjhonXUox3OV47FGrUfUJJLnE31jb3QvQ1wUYqKPIWz55uXmyFxnX8bKZW3k3/hVYuw9J03DRPlbl3LJsWLGj2ehlz0Qb8hyjXOh/FtFW13G5RXYpcbWz1XG0N7IHhr759gXu+C6bwdMm+r3Pm3GtV941Taey2XuF3GVrGUeCVwCWk9zTLXEHuK7g4WFHidSRnDX/wCoA+/VJ3cM01344L3bfQdp4jqqFiux4+P1HncSpPAD2uZf6sEewrIt+zVXWqbXt3NfS/ae6v8AMgpezZjmHY1zS1j2uB0E5SPEGyx9RwPWVvKXN7DYq+0Wjtacm4v1r9URUeHvZjKBc1waGVO0dBIbAJ05pSmM4ZjNYfkyvjV0L6Yyraaz2N46Pj6QeKfqWEeep6M3xWFwIAEACABAFR0uH5lif2TvgVbT+ZH2lGp/Jl7GfP8AggRi9P8ApH/uCq411Q79lVu37f0NrfXmAOV+X915rGNz12MbkNIAui99JUnsixp4yTuwmUCdVX4mXsV82XsK1WjNA0CtT2yy+L2McZUyi8mNPNdrjlna4ZYqxoIzcxpHgrXnoWvKeDGm6Nt0NZK59clhhcaGuEeruqJ088d+pU6nKL5upU9IK/0TnNgOY4PbztY+RBKboj6ST7lGvjJUOS7bmjsa/J6ktFs2XT94D4rS2z13PLxU3DPLsu+P1M6NJ8GKWaDc5SY7uQUZNZ3Z2EJ4aUc+7Js/RNjuqzOkgnKBtlaTeOck+xI6ppywjf4QpOpyb9S9xY8QrZGOd5Ad50UtFT410YPz39nca4jqvA0s598be17FPT0X0aKWMHzBvcmAClg5uHVnVGDmSWmApI4zNjV1Ijk8LN0YO5Jabb2sV3BzJedInscKOEIDuqZmqCT69UB4Bvs3L7V5nUuF18pNZxsje0cXXUku5a+izBdSzIQR9ITcg6hvJZvhyhtIvtUE/Qz7zraCsEACABAAgCr6Tx+SV50NNw9ohdTSeX0A4ThaDsM4UKrialRxeyCT2RoJ520WTdLxW5rovM9Hwu+mEfCTy3nsXzGh2o9gSEk+w+5NMhrEAyBcHST2fD8HUqcU8bsujlr97jdbHSBbQ+EJdUrOUUKCRhh47Wbc2NrRquyz0R1ybWwjjaIMuA++0K6ubWzGarGtmR3yhto5R8Cp7ZyTeG8kootcJGbldpgnu71HMk8MqXMnuRMw5LgBPj+NFZzpLJY543I8dw3PTe2SLDQSIBBRC/EkynUR8at19MmlOfTaDTLqoIcQRm7Iv9kN+a0sSbzseZUoV5rk3189uvkSV8QzO8U31O262RxDTOnZjnbVCi2k5JbFk7K3ZJRb3e2Ht9DbOFYLqmNplwsTcd5lZ1s+ZuSR6HS1OmlQ64M+IYam9mVwJEzYxfmu0W2Vy5o7BfpoaqPLNbFE7hdQeo50frX9626eNWQ2keb1PAIp+g/iRtrVG+s2fD7tVsUcbrf4jHv4PfXvgkbxJhIGniFpw1tU8YZmy0849UOsum0UMkYYN13oRMeslcydxgt+jdAPqjN6jZe88mtu73KjVXeDTKb8iyil22Rgu5TU+Ig4jEYiscnWVS5s79loAHhEeS8rpLouDcnueoupdc+m230N29FeNdWaXuI/SkCBFgBE9+6pU5T3kyvUcuzisf8AtnXF0XBAAgAQAIAr+kDA7DVgfsFV2/gfsOS6HDukzvz/AA0mIpO/8lnQ/JkOcLf86LLOjjKLLVKjGlwtme0HXW5SEqrJ4cEb118Yvd4Iq3FaF/paR5DrGR37q1UWY6Eoamn+5ENHiNCSXVqVzpnbHxXJUW42R2zU1bYkiepjKMEtq0nDch7YHjfRRjp7X1iyMNTT3kLjH0jY1qUftGeZ1U3RPqkWvV0f3IaDG5QWODgdCCCPu1VOXnElhk67lNZQ9hcLmDTdsG86X0hL234yjlljWUQ1aHVvP2TNzJ7/AGqdc3ZFeZKM3NIhc7sZZAAHLXXVWY9LJd/Vk1Kpw2lUrOpvkGpD6bmxMwA9nLYGFpK2cYJrtszM1GmrnfKuaxndP5NfLJJh+D0m1m02ScnbqvdEtAnI3kJN47lGV83DmffZIjXpKq7owhu1u/0XxLSqNDMzoqos3oy3MAFJvBJtFmwEtDQ0kDWNz/S6Xk+7FnjmbbM6fDgYDmiJ3F/x9yrldjoU2cr3XUpONcNYym5zhckNaORP3C62eEKV9yWdkYXG5QrqWEsshoHSPC6+hI8O0ZV2XB0XWEWYtjxXALdzuowTnH1sQ7I3/QL1D52HmvPcevxFVJ9epv8AANPz2Ozy+pR4ymZoEC2Z0mP1SL+a8vQ92eoti4yh7X9DoHo23/afJqeq6GTxL8xez9TqytM4EACABAAgCr6UVSzCYhzQCRScQCYBgc9lGazFohZJRg5PscErY04jEBz6Ya+lT7Ja8kQSdoHes6cPDhhPqaXA5V3+lFdP30POJcO6wWLA4MLml7WEQ0VXZSX2aCQO14K3TLMGMcTwrUvUUjuC4y46ilLbOBbhxlIGaDOhyw6ORBV2JGepIkZwHFZKrnUqbXU2zkNOje4DgT9WGnMJ1GilhneZFnwmliKVFzHUJeKjiGt6sRApyXbBmhkbNmIuupM48NlD/snGNafoaZDGyTloGwDXSTebEHzUcMnmPmb3wPDtDbw1oqVAANgHugADS1ljayTU5JI9Bo5P7slEvTj2NAgXH1u/X3rN8GUuvcl4MpPcrK/FstMwASTy9vmmYabM8vsMw075t+xWNxJgtjWfZ3JxxXUalHuKY3CtqsiXNc12Zjm/VI3HMKyE3CQtqtKr0lnDXR+QYTBdWwy8uLjmed3HmfkETnzS6dCemoVEcLeT6tjBcIt71FLcsk98HuFaXOA8/wAfeiR1zwWILWWc4tEbG1okk7aqhxct0slE7IrbzMm4oNE5xBFx7Ba+tx7VGVTl2IucJPCaKLjeJFSo1g9VjZI/Wdz8B8V7P7PaTw63OXVniuO6nnv5V0WxAw3henXUwH0JcQJid9l1kUZsAA7l051GH121GtZUaXBk5YMRNzHmkNXw2nVPmmt/ND+j4jfpPy2seTQviuGio6nlqENbMiSDcQIIWLPgFleXXJP27M0tZ9oJX1rlhyyXdPKN29HWH6slsm9SbumbNFpOiTemtq2nFoW02ss1CbteWunsOqqA0CABAAgAQBTdM6oZgMU46Ci8n2FcfQrug51yiurR85YXjFJtZ1Q5i0sDYAvIJKVuqlNJIc4HOOjg1a+vkPV+O4d47XXCwFg4W7QN2vaYIcRGihXVdBYSQ/qdRpbp8zb/AH7QHEaTmZ82JMOyntVzqC6P03KfahyuUsYXxZSoaXl5lJ/BGRx7AJH5Z+sfzjT1v87nfyQp29+X4kX93838EDsfRgO/KKjSQCA6riJg3m1XmPcjxbs45RhU6VJZnjPsPG4vDlsOxDspkQauIiDqI6zSFx23f2kvB0n/AFPp/gb/ANrCmwOph1dpe4/R7EkuMjYXsl5VOyTctmPQujTTFVpyXqPH9ISdMLWjaR8Y1UY6T/8ASOR4hJLeuRlX4th4EuawkAgE3AImURqmaC1tUcc80m1nDM6fEKHVdYarQ0Oy5rxm1g98XQ6p82MEZa6nHOpLBFU4pQa7K6o0Eai+4kfFHhTa2RyWu08NnNZPafE6DjlZUaSTYDdd8Ka6osq19FklGMlkQdxKqD+gn98fctP+E3NZMCX2moU3t0/fkZ0uL1R/0P8A9B9y4+D3MivtPQv6S1xvSHDg5Hw10NMXcBIG8LLWkthJo1FrtPhOUuqz08xKrxVtUjqw1zbmq4yIaIJ2umqNJKXUpv4jCMW6Un59hZhLpcfWcZPnoF73TUqqpRPBWzc5tsapAppC7J2kHVSOGWUIOGFNsa2K4iTMs4mF04MUXuEQ4g62KGs7M4dD6D8cquDhWe5wsGzz3v7F53itdVcoqCw2aehlOSbk8o3tplZBoHqABAAgBXiuCFejUokloqNLSRqJtIUoS5ZKXkQnDni4+ZzjF9B+rdlbUe4DctCcjrmljlRnW8LhZJycmLv6HPP13fwhdfEJ9kiK4PUusmWnCuE1aDCxoBl2aSy82F4dyCydVQtRY7JPD9Rq6eKorVce3mN1sLVex7HN9ZpbYHcRzMpZcPinnmZc7fUayOgDLWJgRdjdOWib8P1iLok/62eU+gQGhfqTGVtpTNdnJHlwPU2eHFRxnHmT0OheWbvuZ0HID5Ki2tWS5mPVcTlXHlUUSjokebvYFV93XmTfF5v+lDlDgBa1rcvqgD1RtYLsKFHuZFq8STl0yScN4K6i+o7Jm6wgkECBDWtt7FVbo1Y0+ZourtcK+THfJTnoNeZf/CFb4C8zTjxdxil4cT3/AHII0c4HY5R8EeAu7Oy4zNrEYRT8xc9AHf5j/wCAfetNa6xLGx5mWgqbbedzJvQG13vP7oUlr7O6RF8Ora2bM2dBIJOZ5mPqt2AHyWfOPNJy8xi+jxuXLawkvge1eguYEFz4LS2wAsYPyUqv5byT0tUaIyi90/MosZ0NxFOerlw5PEe8fctWrik4/iWSizSRl+HYp6tOtR/S0ntA+tEj2jTzWhTxGqez2FbNJJGdDFNdcEGVoRmpboUlFobarSBlaVwBeJJXO5IYpg+a6ROidEcFGQeZ815PiFviXyflt8Db0sOWpG/gJIYBAAgAQAIA8LQgAyjkgAyjkgAyjkgAyjkgAyjkgAyjkgAyjkgAyjkgAyjkgAyjkgAyjkgAyjkgAyjkgAyjkgAyjkgDw0wdggBTEcLpP1aEAarxr0eYatJyAO+03su9o181ZC2cPwsjKEZdUaVxX0f4ujPUVcw+zUHwcB8k/XxS2O0txaWjg+hq+JbiaBjEUXsH2xdvtC0KeKVy2lsLT0cl03JKOLY/Rwn5LShZGfRikoOPVFxwuhme1vf7t1y+zw65T8kRhDnko+Z1fovh7Fy8W3nc9DjBsKABAAgAQAIAEACABAAgAQAIAEACABAAgAQAIAEACABAAgAQAIAEAeOaDqgBLE8Kpv1CANQ436N8NWkhga77TOyfdYqcZyg8xeDjSfVFJwnobVwlUuzuezLADgJBteRqIlMT1ts63XJ7FS09cZcyW50vhFDJTAShcOoAEACABAAgAQAIAEACABAAgAQAIAEACABAAgAQAIAEACABAAgAQAIAEACAMXMB1CAPQEAeoAEACABAAgAQAIAEACABAAgAQAIAEACABAAgAQAIAEACABAAgAQAIAEACABAAgAQAIA//9k=',

  /**
  * Checks if an one-dimensional array contains certain value
  **/
  arrayContains: function(a, item)
  {
    var array = a || [];
    for (var i = 0; i < array.length; i++) {
      if (array[i] === item) {
        return true;
      }
    }

    return false;
  },

  /**
  * Removes forbidden characters for a file name
  **/
  cleanFileName: function(fileName)
  {
    return fileName.replace(/[|&;:$%@"<>+,]/g, "");
  },

  escapeHtml: function(unsafe)
  {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },

  /**
  * Returns a formatted date
  * @format 'a' yyyy-mm-dd 'b' dd/mm/yyyy
  * @dateString
  **/
  formatDate: function(format, dateString)
  {
    var format = format || 'a';
    var date;
    if (dateString) {
      date = new Date(dateString);
    } else {
      date = new Date();
    }

    if (format === 'a') {

      var formattedDate = 
        date.getFullYear() + '-' +
        this.pad(date.getMonth() + 1, 2) + '-' +
        this.pad(date.getDate(), 2);

    } else {
      
      var formattedDate = 
        this.pad(date.getDate(), 2) + '/' +
        this.pad(date.getMonth() + 1, 2) + '/' +
        date.getFullYear();
    }

    return formattedDate;
  },

  getDeviceType: function()
  {
    if (navigator.userAgent.match(/iPad/i)) {
      return 'iPad';
    }  else if (navigator.userAgent.match(/iPhone/i)) {
      return 'iPhone';
    } else if (navigator.userAgent.match(/Android/i)) {
      return 'Android';
    } else if (navigator.userAgent.match(/BlackBerry/i)) {
      return 'BlackBerry';
    } else {
      return 'Browser';
    }
  },

  hideLoader: function ()
  {
    $('.overlay_modal').addClass('hidden');
  },

  isAndroid: function()
  {
    return this.getDeviceType() === 'Android';
  },

  isBrowser: function()
  {
    return this.getDeviceType() === 'Browser';
  },

  isIOs: function()
  {
    return (this.getDeviceType() === 'iPhone' || this.getDeviceType() === 'iPad');
  },

  isIphone: function()
  {
    return this.getDeviceType() === 'iPhone';
  },

  // Checks if a variable is empty
  isEmpty: function(data)
  {
    if (typeof data === 'number' || typeof data === 'boolean') {
      return false;
    }

    if (typeof(data) === 'undefined' || data === null) {
      return true;
    }

    if (typeof data.length !== 'undefined') {
      return data.length === 0;
    }

    var count = 0;
    for (var i in data) {
      if (data.hasOwnProperty(i)) {
        count++;
      }
    }

    return count === 0;
  },
  
  mobileDeviceStorageDirectory: function()
  {
    if (this.isIOs()) {
      return cordova.file.dataDirectory;
    } else {
      return cordova.file.externalRootDirectory;
    }
  },
 
  pad: function(str, max)
  {
    str = str.toString();
    return (str.length < max ? this.pad("0" + str, max) : str);
  },

  showAlert: function (message, title)
  {
    if (navigator.notification) {
      navigator.notification.alert(message, null, title, 'OK');
    } else {
      alert(title ? (title + ": " + message) : message);
    }
  },

  showConfirm: function (message, confirmCallback, title)
  {
    if (navigator.notification) {
      navigator.notification.confirm(message, confirmCallback, title);
    } else {
      if (confirm(title ? (title + ": " + message) : message)){
        confirmCallback();
      }
    }
  },

  showLoader: function (message)
  {
    console.log('showLoader');
    message = message || 'Cargando';
    $('.overlay_modal').removeClass('hidden');
    $('#modal_message').html(message);
  },

  /**
  * Converts an image to base64
  **/
  toDataUrl: function(src, callback, outputFormat)
  {
    outputFormat = outputFormat || 'image/png';

    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      var canvas = document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      var dataURL;
      canvas.height = this.height;
      canvas.width = this.width;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
    };
    img.src = src;
    
    // make sure the load event fires for cached images too
    if (img.complete || img.complete === undefined) {
      img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      img.src = src;
    }
  },

  validateEmail: function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
};